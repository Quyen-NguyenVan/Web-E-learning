// src/api.js (cập nhật)
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Đăng ký axios interceptor để tự động gắn token vào header
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}, error => Promise.reject(error));

// Đăng ký người dùng
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Đăng nhập người dùng
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Lấy tất cả các bài giảng
export const getLectures = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/lectures`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Tạo bài giảng mới
export const createLecture = async (lectureData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/lectures`, lectureData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
