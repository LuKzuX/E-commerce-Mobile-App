import mongoose, { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
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
        type: String,
      },
      productImage: {
        type: String,
      },
    },
  ],
  address: {
    type: Object,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
})

export const User = mongoose.model('User', userSchema)
