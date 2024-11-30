import {User} from "../models/userSchema.js"

export const getCartProducts = async (req, res, next) => {
    try {
      res.send(req.user)
    } catch (error) {
      res.send(error);
    }
  };