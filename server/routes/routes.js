import express from "express";
export const router = express.Router();
import multer from "multer";
import { userAuth } from "../middlewares/userAuth.js";
import { createUser, loginUser } from "../controllers/userControllers.js";
import {
  getAllProducts,
  createProduct,
} from "../controllers/productControllers.js";

<<<<<<< HEAD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

=======
>>>>>>> c6b39b9218679ed46382c253eab26cb6a00e09aa
router.post(`/signup`, createUser);
router.post(`/signin`, loginUser);

router.get("/", getAllProducts);

router.post(
  `/new-product`,
  userAuth,
  upload.single("productImage"),
  createProduct
);
