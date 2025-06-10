import mongoose from "mongoose";

export const connect = async (url) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(url);
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};
