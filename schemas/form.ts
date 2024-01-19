
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
  spaceId: z.string().uuid(), // Assuming spaceId should be a valid UUID
});

export type formSchemaType = z.infer<typeof formSchema>;
