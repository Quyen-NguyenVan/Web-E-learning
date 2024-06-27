// controllers/authController.js

// Đăng ký người dùng
export const register = (req, res) => {
    // Logic xử lý đăng ký
    res.json({ message: 'User registered' });
};

// Đăng nhập người dùng
export const login = (req, res) => {
    // Logic xử lý đăng nhập
    res.json({ message: 'User logged in' });
};
