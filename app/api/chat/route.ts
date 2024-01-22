import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { kv } from '@vercel/kv';
import { currentUser } from '@clerk/nextjs';
import { nanoid } from '@/lib/utils';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const createRequestMessages = async (req: Request) => {
  const { messages, data } = await req.json();
  if (!data?.imageUrl) return messages;

  const initialMessages = messages.slice(0, -1);
  const currentMessage = messages[messages.length - 1];
  return [
    ...initialMessages,
    {
      ...currentMessage,
      content: [
        { type: 'text', text: currentMessage.content },
        {
          type: 'image_url',
          image_url: data.imageUrl,
        },
      ],
    },
  ];
};

export async function POST(req: Request) {
  const json = await req.json();
  const user = await currentUser();

  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const userId = user.id;
  const previewToken = json.previewToken; // Make sure to include the logic to get the previewToken

  // Choose the appropriate model based on your condition
  const model = previewToken ? 'gpt-4-vision-preview' : 'gpt-3.5-turbo';

  const inputMessages = await createRequestMessages(req);
  const response = await openai.chat.completions.create({
    model,
    stream: true,
    messages: inputMessages,
    max_tokens: 2000,
  });

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100);
      const id = json.id || nanoid();
      const createdAt = Date.now();
      const path = `/chat/${id}`;
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...json.messages,
          {
            content: completion,
            role: 'assistant',
          },
        ],
      };

      await kv.hmset(`chat:${id}`, payload);
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`,
      });
    },
  });

  return new StreamingTextResponse(stream);
}
