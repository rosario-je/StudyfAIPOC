import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

//mongodb setup
const mongoString = process.env.MONGODB_URI

mongoose.connect(mongoString)
const db = mongoose.connection;

export default db;