import { Product } from '../models/productSchema.js'
import { User } from '../models/userSchema.js'
import fs from 'fs'
import path from 'path'

export const getAllProducts = async (req, res, next) => {
  const page = req.query.p || 1
  const find = req.query.f || ''
  const sort = req.query.s || null
  const category = req.query.c || null
  const numFilterMin = req.query.minprice || 0
  const numFilterMax = req.query.maxprice || 100000000
  const productsPerPage = 8
  try {
    const query = {
      productName: { $regex: find, $options: 'i' },
      productPrice: { $gte: numFilterMin, $lte: numFilterMax },
    }

    if (category) {
      query.productCategory = category
    }

    const products = await Product.find(query)
      .limit(productsPerPage)
      .skip(productsPerPage * (page - 1))
      .sort(sort)

    res.json(products)
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const getProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await Product.find({ _id: id })
    res.json(product)
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const {
      productName,
      productPrice,
      productCategory,
      productDescription,
      imageUrl,
      productQuantity,
    } = req.body

    if (
      !productName ||
      !productPrice ||
      !productCategory ||
      !productDescription ||
      !imageUrl ||
      !productQuantity
    ) {
      return res.status(400).json({ statusText: 'Fill all the fields' })
    }

    const product = await Product.create({
      productName,
      productPrice,
      productCategory,
      productDescription,
      productImage: imageUrl,
      productQuantity,
    })

    res.json(product)
  } catch (error) {
    return res.status(400).json(error)
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
      imageUrl,
      productQuantity,
    } = req.body

    const product = await Product.findByIdAndUpdate(
      { _id: id },
      {
        productName,
        productPrice,
        productCategory,
        productDescription,
        productImage: imageUrl,
        productQuantity,
      },
      { new: true, runValidators: true }
    )

    res.json(product)
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete({ _id: id })

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

    res.send('deleted')
  } catch (error) {
    return res.status(400).json(error)
  }
}
