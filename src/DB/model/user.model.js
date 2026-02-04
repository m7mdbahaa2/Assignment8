import mongoose, { Schema } from "mongoose";

export const users = [];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 60,
    },
  },
  {},
);

export const userModel = mongoose.models.user || mongoose.model("user", userSchema);
