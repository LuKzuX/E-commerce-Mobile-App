import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    }
})