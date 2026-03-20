import { type AIImage } from "./types";

export type { AIImage };

class ImageStore {
  private images: Map<string, AIImage> = new Map();

  constructor() { }

  getAll(): AIImage[] {
    return Array.from(this.images.values()).sort((a, b) => b.createdAt - a.createdAt);
  }

  getById(id: string): AIImage | undefined {
    return this.images.get(id);
  }

  add(image: Omit<AIImage, "id" | "createdAt">): AIImage {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7);
    const newImage: AIImage = {
      ...image,
      id,
      createdAt: Date.now(),
    };
    this.images.set(id, newImage);
    return newImage;
  }

  delete(id: string): boolean {
    return this.images.delete(id);
  }

  search(query: string, fields: Array<keyof AIImage>): AIImage[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll().filter((img) =>
      fields.some((field) => {
        const value = img[field];
        return typeof value === "string" && value.toLowerCase().includes(lowerQuery);
      })
    );
  }
}

export const imageStore = new ImageStore();