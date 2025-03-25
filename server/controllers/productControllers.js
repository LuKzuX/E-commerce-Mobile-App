import { Product } from '../models/productSchema.js'
import { User } from '../models/userSchema.js'
import fs from 'fs'
import path from 'path'

export const getAllProducts = async (req, res, next) => {
  const page = req.query.p || 1
  const find = req.query.f || ''
  const sort = req.query.s || ''
  const numFilterMin = req.query.minprice || 0
  const numFilterMax = req.query.maxprice || 1000000
  const productsPerPage = 12
  try {
    const products = await Product.find({
      productName: { $regex: find, $options: 'i' },
      productPrice: { $gte: numFilterMin, $lte: numFilterMax },
    })
      .limit(productsPerPage)
      .skip(productsPerPage * (page - 1))
      .sort(sort)
      
    res.json(products)
  } catch (error) {
    res.send(error)
  }
}

export const getProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await Product.find({ _id: id })
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
    } = req.body
    const product = await Product.create({
      productName,
      productPrice,
      productCategory,
      productDescription,
      productImage,
      productQuantity,
    })

    res.json(product)
  } catch (error) {
    res.send(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const {
      productName,
      productPrice,
      productCategory,
      productDescription,
      productImage = req.file.path,
      productQuantity,
    } = req.body
    const product = await Product.findByIdAndUpdate(
      { _id: id },
      {
        productName,
        productPrice,
        productCategory,
        productDescription,
        productImage,
        productQuantity,
      },
      { new: false, runValidators: true }
    )
    res.json(product)
  } catch (error) {
    console.log(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const { _id } = req.user.user
    const deletedProduct = await Product.findById({ _id: id })

    const imagePath = path.join(
      './images/',
      deletedProduct.productImage.split('\\')[1]
    )
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
    console.log(imagePath)

    res.send(deletedProduct)
  } catch (error) {
    res.send(error)
  }
}
