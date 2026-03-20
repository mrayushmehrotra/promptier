import { z } from "zod";

export const AI_SOURCE = {
  DALL_E: "ChatGPT (DALL-E 3)",
  GOOGLE_NANO: "Google Nano Banana",
  MIDJOURNEY: "Midjourney v6",
  STABLE_DIFFUSION: "Stable Diffusion XL",
} as const;

export type AISource = (typeof AI_SOURCE)[keyof typeof AI_SOURCE];

export const aiSourceSchema = z.enum([
  AI_SOURCE.DALL_E,
  AI_SOURCE.GOOGLE_NANO,
  AI_SOURCE.MIDJOURNEY,
  AI_SOURCE.STABLE_DIFFUSION,
]);

export const aiImageSchema = z.object({
  id: z.string(),
  userId: z.string(),
  base64Data: z.string(),
  prompt: z.string().min(1, "Prompt is required"),
  aiSource: aiSourceSchema,
  createdAt: z.number(),
});

export const addImageInputSchema = z.object({
  base64Data: z.string().startsWith("data:image/", "Invalid image format"),
  prompt: z.string().min(1, "Prompt is required"),
  aiSource: aiSourceSchema,
});

export type AIImage = z.infer<typeof aiImageSchema>;
export type AddImageInput = z.infer<typeof addImageInputSchema>;