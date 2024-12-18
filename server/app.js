import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors"
import { connect } from "./db/connection.js";
import { router } from "./routes/routes.js";
import bodyParser from "body-parser";

app.use(bodyParser.json())
app.use('/images', express.static('./images'))
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
