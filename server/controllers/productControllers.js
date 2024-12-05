import { Product } from "../models/productSchema.js";
import { User } from "../models/userSchema.js";

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

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {_id} = req.user.user
    const loggedUser = await User.findById({_id})
    const deletedProduct = await Product.findByIdAndDelete({_id: id})
    
    const filtered = loggedUser.cart.filter((obj) => {
      return obj._id.toString() !== deletedProduct._id.toString()
    })
    loggedUser.cart = filtered
    loggedUser.save()
    res.send(deletedProduct)
  } catch (error) {
    res.send(error)
  }
}
