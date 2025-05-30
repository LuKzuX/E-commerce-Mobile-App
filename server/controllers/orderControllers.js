import { Order } from "../models/orderSchema.js";

export const getUserOrders = async (req, res, next) => {
  try {
    const { _id } = req.user.user;
    const ordersByUser = await Order.find({ orderBy: _id });
    res.json(ordersByUser);
  } catch (error) {
    res.send(error);
  }
};


//for the future