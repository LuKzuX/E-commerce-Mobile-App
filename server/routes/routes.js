import express from "express";
export const router = express.Router();
import multer from "multer";
import { userAuth } from "../middlewares/userAuth.js";
import { createUser, loginUser } from "../controllers/userControllers.js";
import {
  getAllProducts,
  getProductDetails,
  createProduct,
} from "../controllers/productControllers.js";
import { getCartProducts } from "../controllers/cartControllers.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post(`/signup`, createUser);
router.post(`/signin`, loginUser);

router.get("/cart", getCartProducts)

router.get("/", getAllProducts);
router.get("/:id", getProductDetails)
router.post(
  `/new-product`,
  userAuth,
  upload.single("productImage"),
  createProduct
);


