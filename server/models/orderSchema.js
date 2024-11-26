import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
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
    type: Array,
    enum: [
      "pending",
      "shipped",
      "in transit",
      "delivered",
      "cancelled",
      "returned",
    ],
  },
  orderValue: {
    type: Number,
    required: true,
  },
  orderBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Order = mongoose.model("Order", orderSchema);
