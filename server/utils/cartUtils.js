import { Product } from '../models/productSchema.js'

export const addMoreOfTheSameProductToCart = (user, id, productToBeAdded) => {
  let found = false
  for (let i = 0; i < user.cart.length; i++) {
    if (id == user.cart[i]._id.toString()) {
      user.cart[i].quantity += 1
      user.cart[i].totalPrice =
        user.cart[i].quantity * productToBeAdded.productPrice
      found = true
      break
    }
  }
  if (!found) {
   user.cart.push({
      _id: productToBeAdded._id,
      quantity: 1,
      totalPrice: productToBeAdded.productPrice,
      productName: productToBeAdded.productName,
      productImage: productToBeAdded.productImage,
      productPrice: productToBeAdded.productPrice,
      productCategory: productToBeAdded.category,
      productDescriptiondescription: productToBeAdded.description,
    });
  }
}

export const subtractProductQuantity = async (user, id) => {
  const product = user.cart.find((obj) => obj._id == id)
  const fullProduct = await Product.find({ _id: id })

  if (product.quantity <= 1) {
    user.cart = user.cart.filter((obj) => obj._id.toString() !== id)
  } else {
    product.quantity -= 1
    product.totalPrice -= fullProduct[0].productPrice
  }
  await user.save()
  return user.cart
}