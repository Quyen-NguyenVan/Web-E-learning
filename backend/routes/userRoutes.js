// ./routes/users.js
import express from 'express';
import bcryptjs from 'bcryptjs'; // Import the whole module as default
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
const bcrypt = bcryptjs; // Re-assign bcrypt for consistency in your code
const router = express.Router();

// Đăng ký người dùng (User Registration)
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Người dùng đã tồn tại' });
        }

        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { user: { id: user.id } };

        jwt.sign(payload, 'secret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server');
    }
});

// Đăng nhập người dùng (User Login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Thông tin đăng nhập không đúng' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Thông tin đăng nhập không đúng' });
        }

        const payload = { user: { id: user.id } };

        jwt.sign(payload, 'secret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server');
    }
});

export default router; // Use export default to export the router
