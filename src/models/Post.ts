import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true }, // URL or base64
    prompt: { type: String, required: true },
    fullPrompt: { type: String, required: true },
    tags: [{ type: String }],
    model: { type: String, required: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    author: {
      username: { type: String, default: "Anonymous" },
      avatar: { type: String, default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80" },
    },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
