import mongoose, { Schema } from "mongoose";

const deliverySchema = new mongoose.Schema({
    deliveryDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    deliveryAddress:{
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    deliveryStatus: {
        type: Array,
        enum: ['pending', 'shipped', 'in transit', 'delivered', 'cancelled', 'returned'],
    },
    deliveryValue: {
        type: Number,
        required: true
    }
})

export const Delivery = mongoose.model("Delivery", deliverySchema)