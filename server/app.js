import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cors from 'cors'
import { connect } from './db/connection.js'
import { router } from './routes/routes.js'
import bodyParser from 'body-parser'

// Basic middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

// Use the router with /api prefix
app.use('/', router)

// Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Server error' })
})

// Connect to MongoDB
const start = async () => {
  try {
    if (process.env.MONGO_URI) {
      await connect(process.env.MONGO_URI)
      console.log('MongoDB connected')
    }
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

// Initialize MongoDB connection
start()

// Export the Express app
export default app
