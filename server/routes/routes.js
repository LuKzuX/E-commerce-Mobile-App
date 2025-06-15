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

const upload = multer({
  storage,
  limits: {
    fieldSize: 50000000,
  },
})

// Helper function to upload to Cloudflare R2
const uploadToR2 = async (file) => {
  try {
    console.log('Starting R2 upload with file:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });

    const key = `${Date.now()}-${file.originalname}`
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })

    console.log('R2 upload command:', {
      bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      key: key,
      contentType: file.mimetype
    });

    await s3Client.send(command)
    const url = `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.CLOUDFLARE_BUCKET_NAME}/${key}`
    console.log('R2 upload successful, URL:', url);
    return url
  } catch (error) {
    console.error('R2 upload error:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw error;
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
  upload.single('productImage'),
  userAuth,
  adminAuth,
  async (req, res, next) => {
    try {
      console.log('Received product data:', {
        body: req.body,
        file: req.file ? {
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size
        } : null
      });

      if (!req.file) {
        console.error('No file received in request');
        return res.status(400).json({ error: 'No image file provided' });
      }

      if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_ACCESS_KEY_ID || !process.env.CLOUDFLARE_SECRET_ACCESS_KEY || !process.env.CLOUDFLARE_BUCKET_NAME) {
        console.error('Missing Cloudflare credentials:', {
          hasAccountId: !!process.env.CLOUDFLARE_ACCOUNT_ID,
          hasAccessKey: !!process.env.CLOUDFLARE_ACCESS_KEY_ID,
          hasSecretKey: !!process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
          hasBucketName: !!process.env.CLOUDFLARE_BUCKET_NAME
        });
        return res.status(500).json({ error: 'Cloudflare configuration is incomplete' });
      }

      req.body.imageUrl = await uploadToR2(req.file)
      console.log('Upload successful, proceeding to create product');
      next()
    } catch (error) {
      console.error('Error in product upload middleware:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      res.status(500).json({ error: 'Error uploading image: ' + error.message })
    }
  },
  createProduct
)
router.get('/', getAllProducts)
router.get('/:id', getProductDetails)
router.patch(
  '/:id',
  upload.single('productImage'),
  userAuth,
  adminAuth,
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.imageUrl = await uploadToR2(req.file)
      }
      next()
    } catch (error) {
      res.status(500).json({ error: 'Error uploading image' })
    }
  },
  updateProduct
)
router.delete('/:id', userAuth, adminAuth, deleteProduct)
