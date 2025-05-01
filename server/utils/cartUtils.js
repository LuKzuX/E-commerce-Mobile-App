import { Product } from '../models/productSchema.js'

export const addMoreOfTheSameProductToCart = (user, id, productToBeAdded) => {
  let found = false
  for (let i = 0; i < user.cart.length; i++) {
    if (id == user.cart[i]._id.toString()) {
      user.cart[i].quantity += 1
      found = true
    }
  }
  if (!found) {
    user.cart.push(productToBeAdded)
  }
}

export const addSpecificProductQuantityToCart = (
  user,
  id,
  quantity,
  product
) => {
  let found = false
  let x = 0
  for (let i = 0; i < user.cart.length; i++) {
    if (id == user.cart[i]._id.toString()) {
      user.cart[i].quantity = quantity
      found = true
    } else {
      if (user.cart.length > 1) {
        x = user.cart.length - 1
      }
    }
  }
  if (!found) {
    user.cart.push(product)
    user.cart[x].quantity = quantity
  }
}

export const subtractProductQuantity = async (user, id) => {
  const product = user.cart.find((obj) => obj._id == id)
  console.log(product);
  
  if (product.quantity <= 1) {
    user.cart.filter((obj) => obj._id !== id)
  } else {
    product.quantity -= 1
  }
}

export const calculatePrice = async (user) => {
  const productIds = user.cart.map((obj) => obj._id.toString())
  const products = await Product.find({ _id: { $in: productIds } })

  const productsMap = {}
  for (let i = 0; i < products.length; i++) {
    productsMap[products[i]._id.toString()] = products[i] //productsMap.id = {Obj}
  }

  for (let i = 0; i < user.cart.length; i++) {
    const product = productsMap[user.cart[i]._id.toString()] // product = {Obj}

    if (product) {
      user.cart[i].totalPrice = product.productPrice * user.cart[i].quantity
    }
  }

  await user.save()
}
