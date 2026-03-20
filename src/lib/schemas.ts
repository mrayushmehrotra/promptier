import { z } from 'zod';

// User schema - mirrors Clerk user data
export const userSchema = z.object({
  clerkId: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  imageUrl: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;

// Base schema for MongoDB storage
const baseImageSchema = z.object({
  _id: z.string().optional(), // MongoDB ObjectId
  userId: z.string(), // Clerk user ID
  base64Data: z.string(),
  prompt: z.string().min(1, 'Prompt is required'),
  aiSource: z.enum([
    'ChatGPT (DALL-E 3)',
    'Google Nano Banana',
    'Midjourney v6',
    'Stable Diffusion XL',
  ]),
  createdAt: z.number(),
});

// API type with id instead of _id
export const imageSchema = baseImageSchema.transform((data) => ({
  ...data,
  id: data._id ?? '',
}));

export type Image = z.infer<typeof imageSchema>;

// For creating new images (without _id)
export const createImageSchema = baseImageSchema.omit({ _id: true });
export type CreateImage = z.infer<typeof createImageSchema>;
