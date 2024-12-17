import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    
  },
  productPrice: {
    type: Number,
    
  },
  productCategory: {
    type: String,
    
  },
  productDescription: {
    type: String,
    
  },
  productImage: {
  },
  productQuantity: {
    type: Number,
   
    default: 0,
  },
});

export const Product = mongoose.model("Product", productSchema)