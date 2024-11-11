import mongoose from "mongoose";

export const connect = (url) => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(url);
};
