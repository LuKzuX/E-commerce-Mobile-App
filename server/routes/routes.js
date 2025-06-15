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
} from '../controllers/cartControllers.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure images directory exists
const imagesDir = path.join(__dirname, '../images')
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Not an image! Please upload an image.'), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
})

// User routes
router.get(`/user`, userAuth, getUser)
router.post(`/signup`, createUser)
router.post(`/signin`, loginUser)
router.patch(`/user`, userAuth, getUserToUpdate, updateUserInfo)

// Cart routes
router.get('/cart', userAuth, getCartProducts)
router.post('/cart/:id', userAuth, addProductToCart)
router.delete('/cart/:id', userAuth, removeProductFromCart)

// Product routes
router.post(
  `/new-product`,
  (req, res, next) => {
    upload.single('productImage')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'File upload error: ' + err.message })
      } else if (err) {
        return res.status(400).json({ error: err.message })
      }
      next()
    })
  },
  userAuth,
  adminAuth,
  createProduct
)
router.get('/', getAllProducts)
router.get('/:id', getProductDetails)
router.patch(
  '/:id',
  (req, res, next) => {
    upload.single('productImage')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'File upload error: ' + err.message })
      } else if (err) {
        return res.status(400).json({ error: err.message })
      }
      next()
    })
  },
  userAuth,
  adminAuth,
  updateProduct
)
router.delete('/:id', userAuth, adminAuth, deleteProduct)
