import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { connect } from "./db/connection.js";
import { router } from "./routes/routes.js";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/material-delivery`, router);

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is listening`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
