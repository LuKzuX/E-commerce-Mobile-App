import path from 'path'
import express from 'express'
export const router = express.Router()
import multer from 'multer'
import { adminAuth, userAuth } from '../middlewares/userAuth.js'
import {
  getUser,
  getUserToUpdate,
  createUser,
  loginUser,
  updateUserInfo,
} from '../controllers/userControllers.js'
import {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productControllers.js'
import {
  getCartProducts,
  addProductToCart,
  removeProductFromCart,
  buy,
} from '../controllers/cartControllers.js'
import { getUserOrders } from '../controllers/orderControllers.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
})

const upload = multer({
  storage,
  limits: {
    fieldSize: 50000000,
  },
})

// User routes
router.get(`/user`, userAuth, getUser)
router.post(`/signup`, createUser)
router.post(`/signin`, loginUser)
router.patch(`/user`, userAuth, getUserToUpdate, updateUserInfo)

// Cart routes
router.get('/cart', userAuth, getCartProducts)
router.post('/cart/:id', userAuth, addProductToCart)
router.post('/cart', userAuth, buy)
router.delete('/cart/:id', userAuth, removeProductFromCart)

// Product routes
router.post(
  `/new-product`,
  upload.single('productImage'),
  userAuth,
  adminAuth,
  createProduct
)
router.get('/', getAllProducts)
router.get('/:id', getProductDetails)
router.patch(
  '/:id',
  upload.single('productImage'),
  userAuth,
  adminAuth,
  updateProduct
)
router.delete('/:id', userAuth, adminAuth, deleteProduct)
