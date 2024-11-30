import {User} from "../models/userSchema.js"

export const getCartProducts = async (req, res, next) => {
  const {_id} = req.user.user
    try {
      const loggedUser = await User.findById({_id})
      res.send(loggedUser.cart)
    } catch (error) {
      res.send(error);
    }
  };