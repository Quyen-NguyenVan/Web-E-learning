// import mongoose from 'mongoose';
// import express from "express";
// import dotenv from 'dotenv';
// import cors from 'cors';
// import session from 'express-session';
// import Admin from './models/Auth/Admin.js';
// dotenv.config();


// const app = express();
// connectDB();


// app.use(express.static('public'));
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true // Cho phép gửi cookies và các thông tin xác thực khác
// }));
// app.use(express.static("."));
// app.use(session({
//   secret: process.env.SESSION_KEY, // Khóa bí mật để mã hóa session
//   resave: false,
//   saveUninitialized: true
// }));


// app.use((req, res, next) => {
//   res.status(404).json({ error: 'Not Found' });
// });

// const mongoDBURL = process.env.mongoDBURL


// mongoose.connect(mongoDBURL, {

// })
//   .then(() => {
//     console.log('Connected to MongoDB!');
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB:', err);
//   });

// app.use((req, res, next) => {
//   req.currentDate = new Date();
//   next();
// });

// export default app

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import connectDB from './config/db.js';
import createDefaultAdmin from './config/createDefaultAdmin.js';

dotenv.config();

const app = express();

// Kết nối cơ sở dữ liệu và tạo admin mặc định
connectDB().then(createDefaultAdmin);

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Cho phép gửi cookies và các thông tin xác thực khác
}));
app.use(session({
  secret: process.env.SESSION_KEY, // Khóa bí mật để mã hóa session
  resave: false,
  saveUninitialized: true
}));

// Example route: Authentication routes
import authRoutes from './routes/authRoutes.js';
import lectureRoutes from './routes/lectureRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/lectures', lectureRoutes);

// Middleware thêm ngày hiện tại vào request
app.use((req, res, next) => {
  req.currentDate = new Date();
  next();
});

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

export default app;
