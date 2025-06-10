import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors"
import { connect } from "./db/connection.js";
import { router } from "./routes/routes.js";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/material-delivery`, router); 

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  start();
}

// For Vercel deployment
export default app;
