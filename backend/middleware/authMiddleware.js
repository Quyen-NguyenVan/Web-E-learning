import jwt from 'jsonwebtoken';
import { User } from '../models/User.js'; // Ensure you use ES module syntax and the correct path

const authMiddleware = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(401).json({ msg: 'User not found, authorization denied' });
        req.user.role = user.role;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default authMiddleware; // Use export default for ES modules
