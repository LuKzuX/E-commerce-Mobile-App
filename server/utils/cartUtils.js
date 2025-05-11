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
      totalPrice: productToBeAdded.productPrice * 1,
    })
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

export const showProductsInCart = async (user) => {
  try {
    const idArr = []
    for (let i = 0; i < user.cart.length; i++) {
      idArr.push(user.cart[i]._id)
    }
    const products = await Product.find({ _id: { $in: idArr } })
    const newArr = []
    for (let j = 0; j < products.length; j++) {
      for (let k = 0; k < user.cart.length; k++) {
        if (products[j]._id.toString() == user.cart[k]._id.toString()) {
          newArr.push({
            _id: user.cart[k]._id,
            productName: products[j].productName,
            productPrice: products[j].productPrice,
            productDescription: products[j].productDescription,
            productImage: products[j].productImage,
            quantity: user.cart[k].quantity,
            totalPrice: user.cart[k].totalPrice
          })
        }
      }
    }
    return newArr
  } catch (error) {
    console.log(error)
  }
}
