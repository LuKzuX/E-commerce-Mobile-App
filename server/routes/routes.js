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
import { PutObjectCommand } from '@aws-sdk/client-s3'
import s3Client from '../utils/cloudflareConfig.js'
import dotenv from 'dotenv'

dotenv.config()

const storage = multer.memoryStorage()

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

// Helper function to upload to Cloudflare R2
const uploadToR2 = async (file) => {
  const key = `${Date.now()}-${file.originalname}`
  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  })

  try {
    console.log('Attempting to upload to R2 with config:', {
      bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      key: key
    })
    
    await s3Client.send(command)
    // Return the public URL for the uploaded file
    return `https://pub-${process.env.CLOUDFLARE_BUCKET_NAME}.r2.dev/${key}`
  } catch (error) {
    console.error('Cloudflare R2 upload error details:', {
      message: error.message,
      code: error.code,
      requestId: error.$metadata?.requestId,
      cfId: error.$metadata?.cfId,
      bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`
    })
    throw new Error(`Failed to upload to Cloudflare R2: ${error.message}`)
  }
}

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
    upload.single('productImage')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'File upload error: ' + err.message })
      } else if (err) {
        return res.status(400).json({ error: err.message })
      }
      try {
        if (!req.file) {
          return res.status(400).json({ error: 'No image file provided' })
        }
        req.body.imageUrl = await uploadToR2(req.file)
        next()
      } catch (error) {
        return res.status(500).json({ error: 'Error uploading to Cloudflare: ' + error.message })
      }
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
    upload.single('productImage')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'File upload error: ' + err.message })
      } else if (err) {
        return res.status(400).json({ error: err.message })
      }
      try {
        if (req.file) {
          req.body.imageUrl = await uploadToR2(req.file)
        }
        next()
      } catch (error) {
        return res.status(500).json({ error: 'Error uploading to Cloudflare: ' + error.message })
      }
    })
  },
  userAuth,
  adminAuth,
  updateProduct
)
router.delete('/:id', userAuth, adminAuth, deleteProduct)
