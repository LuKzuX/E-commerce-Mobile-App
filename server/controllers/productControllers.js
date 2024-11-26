import { Product } from "../models/productSchema.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.send(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const {
      productName,
      productPrice,
      productCategory,
      productDescription,
      productImage,
      productQuantity,
    } = req.body;
    const product = await Product.create({
      productName,
      productPrice,
      productCategory,
      productDescription,
      productImage,
      productQuantity,
    });

<<<<<<< HEAD

=======
>>>>>>> c6b39b9218679ed46382c253eab26cb6a00e09aa
    res.json(product);
  } catch (error) {
    res.send(error);
  }
};
