import mongoose, { Schema } from "mongoose";
import { users } from "./user.model.js";

export const notes = [];

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: {
      ref: 'user',
      required: true,
      // validate:{    validator:(value)=>{value==value.toUpperCase}}
    },
  },
  { timestamps: true },
);

export const noteModel = mongoose.models.note || mongoose.model("note", noteSchema);
