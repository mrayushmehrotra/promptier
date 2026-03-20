import { getDb } from '@/lib/mongodb';
import { User, userSchema } from '@/lib/schemas';
import { ObjectId } from 'mongodb';

export class UserRepository {
  private collectionName = 'users';

  async findByClerkId(clerkId: string): Promise<User | null> {
    const db = await getDb();
    const collection = db.collection(this.collectionName);
    const user = await collection.findOne({ clerkId });

    if (!user) {
      return null;
    }

    return userSchema.parse(user);
  }

  async createFromClerk(clerkId: string, email: string, name?: string, imageUrl?: string): Promise<User> {
    const db = await getDb();
    const collection = db.collection(this.collectionName);

    const now = new Date();
    const user: User = {
      clerkId,
      email,
      name,
      imageUrl,
      createdAt: now,
      updatedAt: now,
    };

    await collection.insertOne(user);
    return user;
  }

  async updateUser(clerkId: string, updates: { email?: string; name?: string; imageUrl?: string }): Promise<User | null> {
    const db = await getDb();
    const collection = db.collection(this.collectionName);

    const updateData = {
      ...updates,
      updatedAt: new Date(),
    };

    const result = await collection.findOneAndUpdate(
      { clerkId },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result) {
      return null;
    }

    return userSchema.parse(result);
  }

  async deleteUser(clerkId: string): Promise<boolean> {
    const db = await getDb();
    const collection = db.collection(this.collectionName);
    const result = await collection.deleteOne({ clerkId });
    return result.deletedCount === 1;
  }
}

export const userRepository = new UserRepository();
