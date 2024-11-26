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


    res.json(product);
  } catch (error) {
    res.send(error);
  }
};
