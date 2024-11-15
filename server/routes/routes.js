import express from 'express'
export const router = express.Router();
import {
    createUser
} from "../controllers/userControllers.js"

router.post(`/signup`, createUser)