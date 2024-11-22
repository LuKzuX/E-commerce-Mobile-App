import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: []
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema)
