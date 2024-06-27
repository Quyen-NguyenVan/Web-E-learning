
// import app from './app.js';

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server listening on port ${port}`));
// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import lectureRoutes from './routes/lectureRoutes.js' // Điều chỉnh đuôi .js nếu cần thiết

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable CORS

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/E-learning')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/lectures', lectureRoutes);


// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
