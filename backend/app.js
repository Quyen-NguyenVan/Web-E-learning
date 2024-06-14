import mongoose from 'mongoose';
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
dotenv.config();


const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000/',
  credentials: true // Allow sending cookies and other credentials
}));
app.use(express.static("."));
app.use(session({
  secret: process.env.SESSION_KEY, // Khóa bí mật để mã hóa session
  resave: false,
  saveUninitialized: true
}));


app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

const mongoDBURL = process.env.mongoDBURL

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

app.use((req, res, next) => {
  req.currentDate = new Date();
  next();
});


export default app
