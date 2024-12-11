import { User } from "../models/userSchema.js";
import { Product } from "../models/productSchema.js";
import { Order } from "../models/orderSchema.js";
import {
  addMoreOfTheSameProductToCart,
  addSpecificProductQuantityToCart,
  calculatePrice,
} from "../utils/cartUtils.js";

export const getCartProducts = async (req, res, next) => {
  const { _id } = req.user.user;
  try {
    const loggedUser = await User.findById({ _id });
    const productIds = loggedUser.cart.map((obj) => obj._id.toString());
    const products = await Product.find({ _id: { $in: productIds } });
    const x = products.map((obj, index) => {
      return {
        ...obj.toObject(),
        totalPrice: loggedUser.cart[index].totalPrice,
        quantity: loggedUser.cart[index].quantity,
      };
    });

    res.json(x);
  } catch (error) {
    res.send(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user.user;
  try {
    const product = await Product.findById({ _id: id });
    const loggedUser = await User.findById({ _id });

    addMoreOfTheSameProductToCart(loggedUser, id, product);
    calculatePrice(loggedUser);

    res.send(loggedUser);
  } catch (error) {
    res.send(error);
  }
};

export const updateProductQuantityInCart = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user.user;
  const { quantity } = req.body;
  try {
    const product = await Product.findById({ _id: id });
    const loggedUser = await User.findById({ _id });
    addSpecificProductQuantityToCart(loggedUser, id, quantity, product);
    calculatePrice(loggedUser);
    res.json(loggedUser);
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
    res.json(newCart);
  } catch (error) {
    console.log(error);
  }
};

export const buy = async (req, res, next) => {
  const { _id } = req.user.user;
  try {
    const loggedUser = await User.findById({ _id });
    const productIds = loggedUser.cart.map((obj) => obj._id.toString());
    const products = await Product.find({ _id: { $in: productIds } });
    const x = products.map((obj, index) => {
      return {
        ...obj.toObject(),
        totalPrice: loggedUser.cart[index].totalPrice,
        quantity: loggedUser.cart[index].quantity,
      };
    });
    let totalPrice = 0;
    const finalObj = [];
    for (let i = 0; i < x.length; i++) {
      finalObj.push({
        productId: x[i]._id,
        productName: x[i].productName,
        totalPrice: x[i].totalPrice,
        quantity: x[i].quantity,
      });
      totalPrice += x[i].totalPrice;
    }
    const order = await Order.create({
      orderItems: finalObj,
      orderDate: new Date(),
      orderAddress: {
        street: req.user.user.address.street || "a",
        city: req.user.user.address.city || "a",
        state: req.user.user.address.state || "a",
        zipCode: req.user.user.address.zipCode || "a",
        country: req.user.user.address.country || "a",
      },
      orderStatus: "pending",
      orderValue: totalPrice,
    });
    res.json(order);
  } catch (error) {
    res.send(error);
  }
};
