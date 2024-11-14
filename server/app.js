import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connect } from "./db/connection.js";
const app = express();
import {User} from '../server/models/userSchema.js'

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

app.get('/', async (req, res) => {
  try {
    const response = await User.create({username: 'Lucas', password: '12345', isAdmin: false})
    res.json(response)
  } catch (error) {
    console.log(error);
    
  }
})

start();
