// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Initialize environment variables
dotenv.config();

// Import Routes
import userRoutes from './routes/user.js';

// Import DB connection
import db from './db/connection.js';

// Create Express app
const app = express();


app.use(express.json()); parse JSON
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Routes
app.use("/api", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});

// Database connection handling
db.on('error', (error) => {
  console.error("Database connection error:", error);
});

db.once('connected', () => {
  console.log('Database connected');
});
