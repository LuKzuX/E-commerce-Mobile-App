import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: {
    type: Array,
    default: {},
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  orderAddress: {
    country: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    areaCode: { type: String, required: true },
  },
  orderStatus: {
    type: String,
    default: "pending",
  },
  orderValue: {
    type: Number,
    required: true,
    default: 0,
  },
  orderBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation time
    index: { expires: '1h' }, // TTL: Delete the document after 1 hour
  },
});


export const Order = mongoose.model("Order", orderSchema);
