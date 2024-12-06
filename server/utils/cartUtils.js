import { Product } from "../models/productSchema.js";

export const addMoreOfTheSameProductToCart = (user, id, productToBeAdded) => {
  for (let i = 0; i < user.cart.length; i++) {
    if (id == user.cart[i]._id.toString()) {
      user.cart[i].quantity += 1;
    } else {
      user.cart.push(productToBeAdded);
    }
  }
};

export const addSpecificProductQuantityToCart = (
  user,
  id,
  quantity,
  product
) => {
  let found = false;
  let x = 0;
  for (let i = 0; i < user.cart.length; i++) {
    if (id == user.cart[i]._id.toString()) {
      user.cart[i].quantity = quantity;
      found = true;
    } else {
      if (user.cart.length > 1) {
        x = user.cart.length - 1;
      }
    }
  }
  if (!found) {
    user.cart.push(product);
    user.cart[x].quantity = quantity;
  }
};

export const calculatePrice = async (user) => {
  const productIds = user.cart.map((obj) => obj._id.toString());
  const products = await Product.find({ _id: { $in: productIds } });
  for (let i = 0; i < user.cart.length; i++) {
    user.cart[i].totalPrice = 0;
    user.cart[i].totalPrice = products[i].productPrice * user.cart[i].quantity;
  }
  await user.save();
};
