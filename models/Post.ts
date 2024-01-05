import mongoose, { Schema } from "mongoose";
import { CharacterSchema } from "./Character";

const personSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

const storySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "Person" },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: "Person" }],
});

const PostSchema = new Schema({
  charId: { type: Schema.Types.ObjectId, required: true, ref: "chars" },
});

export const chars = mongoose.models.chars || mongoose.model("chars", CharacterSchema);

export const Post = mongoose.models.Post1 || mongoose.model("Post1", PostSchema);

export const Story = mongoose.models.Story || mongoose.model("Story", storySchema);
export const Person = mongoose.models.Person || mongoose.model("Person", personSchema);
