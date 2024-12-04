import {User} from "../models/userSchema.js"
import {Product} from "../models/productSchema.js"

export const getCartProducts = async (req, res, next) => {
  const {_id} = req.user.user
    try {
      const loggedUser = await User.findById({_id})
      res.send(loggedUser.cart)
    } catch (error) {
      res.send(error);
    }
  };

export const addProductToCart = async(req, res, next) => {
  const {id} = req.params
  const {_id} = req.user.user
  const {productQuantity} = req.body || 1
  try {
    const product = await Product.findById({_id: id})
    const loggedUser = await User.findById({_id})
    loggedUser.cart.push(product)
    loggedUser.save()
    res.send(loggedUser)
  } catch (error) {
    res.send(error)
  }
}