import { getDb } from '@/lib/mongodb';
import { Image, CreateImage, imageSchema } from '@/lib/schemas';
import { ObjectId } from 'mongodb';

export class ImageRepository {
  private collectionName = 'images';

  async findByUserId(userId: string): Promise<Image[]> {
    const db = await getDb();
    const collection = db.collection(this.collectionName);

    const images = await collection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    return imageSchema.array().parse(images);
  }

  async findById(id: string): Promise<Image | null> {
    const db = await getDb();
    const collection = db.collection(this.collectionName);
    const image = await collection.findOne({ _id: new ObjectId(id) });

    if (!image) {
      return null;
    }

    return imageSchema.parse(image);
  }

  async create(image: CreateImage): Promise<Image> {
    const db = await getDb();
    const collection = db.collection(this.collectionName);

    const id = new ObjectId().toString();
    const doc = {
      ...image,
      _id: id,
    };

    await collection.insertOne(doc);
    return {
      ...image,
      id,
    };
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const db = await getDb();
    const collection = db.collection(this.collectionName);

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId,
    });

    return result.deletedCount === 1;
  }

  async searchByUserId(userId: string, query: string): Promise<Image[]> {
    const db = await getDb();
    const collection = db.collection(this.collectionName);

    const images = await collection
      .find({
        userId,
        $or: [
          { prompt: { $regex: query, $options: 'i' } },
          { aiSource: { $regex: query, $options: 'i' } },
        ],
      })
      .sort({ createdAt: -1 })
      .toArray();

    return imageSchema.array().parse(images);
  }
}

export const imageRepository = new ImageRepository();
