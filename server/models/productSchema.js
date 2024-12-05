import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImage: {
    type: String
  },
  productQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const Product = mongoose.model("Product", productSchema)