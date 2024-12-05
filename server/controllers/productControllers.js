import { Product } from "../models/productSchema.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.send(error);
  }
};

export const getProductDetails = async (req, res, next) => {
  try {
    const {id} = req.params
    const product = await Product.find({_id: id})
    res.json(product)
  } catch (error) {
    res.send(error)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const {
      productName,
      productPrice,
      productCategory,
      productDescription,
      productImage = req.file.path,
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
    console.log(error);
    
    res.send(error);
  }
};
