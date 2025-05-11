import { User } from '../models/userSchema.js'
import { Product } from '../models/productSchema.js'
import { Order } from '../models/orderSchema.js'
import {
  addMoreOfTheSameProductToCart,
  calculatePrice,
  subtractProductQuantity,
} from '../utils/cartUtils.js'

export const getCartProducts = async (req, res, next) => {
  const { _id } = req.user.user
  try {
    const loggedUser = await User.findById({ _id })
    res.json(loggedUser.cart)
  } catch (error) {
    res.send(error)
  }
}

export const addProductToCart = async (req, res, next) => {
  const { id } = req.params
  const { _id } = req.user.user

  try {
    const product = await Product.findById({ _id: id })
    const loggedUser = await User.findById({ _id })

    addMoreOfTheSameProductToCart(loggedUser, id, product)
    await loggedUser.save()

    res.send(loggedUser)
  } catch (error) {
    res.send(error)
  }
}

export const removeProductFromCart = async (req, res, next) => {
  try {
    const { _id } = req.user.user
    const { id } = req.params
    const { removeAll } = req.query
    const loggedUser = await User.findById({ _id })
    if (!removeAll) {
      await subtractProductQuantity(loggedUser, id)
      res.send(loggedUser.cart)
    } else {
      const newCart = loggedUser.cart.filter((obj) => {
        return obj._id.toString() !== id
      })
      loggedUser.cart = newCart
      await loggedUser.save()
      res.json(newCart)
    }
  } catch (error) {
    console.log(error)
  }
}

export const buy = async (req, res, next) => {
  const { _id } = req.user.user
  try {
    const loggedUser = await User.findById({ _id })
    const productIds = loggedUser.cart.map((obj) => obj._id.toString())
    const products = await Product.find({ _id: { $in: productIds } })
    const x = products.map((obj, index) => {
      return {
        ...obj.toObject(),
        totalPrice: loggedUser.cart[index].totalPrice,
        quantity: loggedUser.cart[index].quantity,
      }
    })
    let totalPrice = 0
    const finalObj = []
    for (let i = 0; i < x.length; i++) {
      finalObj.push({
        productId: x[i]._id,
        productName: x[i].productName,
        totalPrice: x[i].totalPrice,
        quantity: x[i].quantity,
      })
      totalPrice += x[i].totalPrice
    }

    for (let j = 0; j < finalObj.length; j++) {
      if (products[j].productQuantity <= 0) {
        return res.json({
          message: 'no product in stock',
          productIssue: 'product: ' + products[j],
        })
      }
      if (finalObj[j].productId.toString() == products[j]._id.toString()) {
        products[j].productQuantity -= finalObj[j].quantity
      }
      if (products[j].productQuantity - finalObj[j].quantity < 1) {
        return res.json({
          message: 'we dont have the amount required in stock',
          productIssue: products[j],
        })
      }
      await products[j].save()
    }

    for (let k = 0; k < products.length; k++) {
      if (products[k]._id.toString() == finalObj[k].productId.toString()) {
        products[k].productTimesSold += finalObj[k].quantity
      }
      await products[k].save()
    }

    const order = await Order.create({
      orderItems: finalObj,
      orderDate: new Date(),
      orderAddress: {
        street: loggedUser.address.street || '',
        city: loggedUser.address.city || '',
        state: loggedUser.address.state || '',
        areaCode: loggedUser.address.areaCode || '',
        country: loggedUser.address.country || '',
      },
      orderStatus: 'pending',
      orderValue: totalPrice,
      orderBy: loggedUser._id,
    })
    loggedUser.cart = []
    await loggedUser.save()
    res.json(order)
  } catch (error) {
    res.send(error)
  }
}
