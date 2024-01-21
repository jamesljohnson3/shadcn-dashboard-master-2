import Ably from "ably/promises";

export async function GET(request: any) {
    const apiKey = process.env.ABLY_API_KEY;

    if (!apiKey) {
        console.error("ABLY_API_KEY is undefined");
        // Adjust the response based on your environment/framework
        return new Response("ABLY_API_KEY is undefined", { status: 500 });
    }

    const client = new Ably.Realtime(apiKey);
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'upbeta' });

    console.log(`Request: ${JSON.stringify(tokenRequestData)}`);
    // Adjust the response based on your environment/framework
    return new Response(JSON.stringify(tokenRequestData), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
