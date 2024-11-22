import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
export const router = express.Router();
import { createUser, loginUser } from "../controllers/userControllers.js";

import {
  getAllProducts,
  createProduct,
} from "../controllers/productControllers.js";

router.post(`/signup`, createUser);
router.post(`/signin`, loginUser);

router.get("/", getAllProducts);

router.post(`/new-product`, userAuth, createProduct);
