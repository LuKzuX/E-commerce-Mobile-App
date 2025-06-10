import { User } from '../models/userSchema.js'
import { Product } from '../models/productSchema.js'
import {
  addMoreOfTheSameProductToCart,
  subtractProductQuantity,
} from '../utils/cartUtils.js'

export const getCartProducts = async (req, res, next) => {
  const { _id } = req.user.user
  try {
    const loggedUser = await User.findById({ _id })
    res.json(loggedUser.cart)
  } catch (error) {
    return res.status(400).json(error)
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

    res.json(loggedUser)
  } catch (error) {
    return res.status(400).json(error)
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
      return
    } else {
      const newCart = loggedUser.cart.filter((obj) => {
        return obj._id.toString() !== id
      })
      loggedUser.cart = newCart
      await loggedUser.save()
      res.json(newCart)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}