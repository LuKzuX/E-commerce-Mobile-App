import { User } from "../models/userSchema.js";
import { Product } from "../models/productSchema.js";
import {
  addMoreOfTheSameProductToCart,
  addSpecificProductQuantityToCart,
  calculatePrice,
} from "../utils/cartUtils.js";

export const getCartProducts = async (req, res, next) => {
  const { _id } = req.user.user;
  try {
    const loggedUser = await User.findById({ _id });
    res.json(loggedUser.cart);
  } catch (error) {
    res.send(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user.user;
  const { productQuantity } = req.body || 1;
  try {
    const product = await Product.findById({ _id: id });
    const loggedUser = await User.findById({ _id });

    if (productQuantity > 1) {
      addSpecificProductQuantityToCart(
        loggedUser,
        id,
        productQuantity,
        product
      );
      calculatePrice(loggedUser);
    } else {
      addMoreOfTheSameProductToCart(loggedUser, id, product);
      calculatePrice(loggedUser);
    }

    res.send(loggedUser);
  } catch (error) {
    res.send(error);
  }
};

export const removeProductFromCart = async (req, res, next) => {
  try {
    const { _id } = req.user.user;
    const { id } = req.params;
    const loggedUser = await User.findById({ _id });
    const newCart = loggedUser.cart.filter((obj) => {
      return obj._id.toString() !== id;
    });
    loggedUser.cart = newCart;
    await loggedUser.save();
    res.json(newCart)
  } catch (error) {
    console.log(error);
  }
};
