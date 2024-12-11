import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orderDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  orderAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  orderStatus: {
   type: String
  },
  orderValue: {
    type: Number,
    required: true,
  }
});

export const Order = mongoose.model("Order", orderSchema);
