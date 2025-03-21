import path from "path"
import express from "express";
export const router = express.Router();
import multer from "multer";
import { adminAuth, userAuth } from "../middlewares/userAuth.js";
import {
  createUser,
  loginUser,
  updateUserInfo,
} from "../controllers/userControllers.js";
import {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import {
  getCartProducts,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantityInCart,
  buy,
} from "../controllers/cartControllers.js";
import { getUserOrders } from "../controllers/orderControllers.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage, limits: {
  fieldSize: 50000000
} });

// User routes
router.post(`/signup`, createUser);
router.post(`/signin`, loginUser);
router.patch(`/user`, userAuth, updateUserInfo);

// Cart routes
router.get("/cart", userAuth, getCartProducts);
router.post("/cart/:id", userAuth, addProductToCart);
router.post("/cart", userAuth, buy);
router.patch("/cart/:id", userAuth, updateProductQuantityInCart);
router.delete("/cart/:id", userAuth, removeProductFromCart);

// Product routes
router.post(
  `/new-product`,
  upload.single("productImage"),
  userAuth,
  adminAuth,
  createProduct
);
router.get("/", getAllProducts);
router.get("/:id", getProductDetails);
router.patch("/:id", userAuth, updateProduct);
router.delete("/:id", userAuth, deleteProduct);

// Order routes
router.get("/orders/get", userAuth, getUserOrders);
