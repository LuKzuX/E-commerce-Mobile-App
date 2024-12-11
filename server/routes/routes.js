import express from "express";
export const router = express.Router();
import multer from "multer";
import { userAuth } from "../middlewares/userAuth.js";
import { createUser, loginUser } from "../controllers/userControllers.js";
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// User authentication routes
router.post(`/signup`, createUser);
router.post(`/signin`, loginUser);

// Cart routes
router.get("/cart", userAuth, getCartProducts);
router.post("/cart/:id", userAuth, addProductToCart);
router.post("/cart/buy", userAuth, buy)
router.patch("/cart/:id", userAuth, updateProductQuantityInCart);
router.delete("/cart/:id", userAuth, removeProductFromCart);

// Product routes
router.post(
  `/new-product`,
  userAuth,
  upload.single("productImage"),
  createProduct
);
router.get("/", getAllProducts);
router.get("/:id", getProductDetails);
router.patch("/:id", updateProduct);
router.delete("/:id", userAuth, deleteProduct);
