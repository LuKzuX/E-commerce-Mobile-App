import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: mongoose.Schema.Types.Decimal128,
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
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    default: 0,
    required: true,
  },
  productTimesSold: {
    type: Number,
    default: 0,
  },
})

export const Product = mongoose.model('Product', productSchema)
