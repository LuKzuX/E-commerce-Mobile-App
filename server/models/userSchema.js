import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"],
  },
  password: {
    type: String,
    required: true,
    minlength: [4, "Password must be at least 4 characters long"],
  },
  email: {
    unique: true,
    type: String,
    required: true,
    validate: {
      validator: function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: (props) => `Type a valid email address`,
    },
  },
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      totalPrice: {
        type: Number,
      },
      productName: {
        type: String,
      },
      productPrice: {
        type: Number,
      },
      productImage: {
        type: String,
      },
    },
  ],
  ip: {
    type: String,
  },
  address: {
    type: Object,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
