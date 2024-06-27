import admin from '../../models/Auth/Admin.js';
import Bcrypt from 'bcryptjs'
import ErrorRepsonse from '../../responses/ErrorResponse.js';
import jwt from 'jsonwebtoken';
// import UserService from '../User/UserService.js';
// const userService = new UserService();
import crypto from 'crypto'
import MailService from './MailService.js';
import TokenRegistration from '../../models/Auth/tokenregistration.js';
class AuthenticationService {

    constructor() {

    }

    static register = async (req) => {
        try {
            const admin = await adminService.findByEmail(req.body.email);
            if (admin) {
                throw new ErrorRepsonse(400, 'Email already exists');
            }

            const hashedPassword = await Bcrypt.hash(req.body.password, 12);
            const adminData = { ...req.body, password: hashedPassword };
            const savedAdmin = await adminService.createAdmin(adminData);

            if (!savedAdmin) {
                throw new ErrorRepsonse(500, 'Failed to create user');
            }

            const token = crypto.randomBytes(20).toString('hex');
            await TokenRegistration.create({ token, adminEmail: req.body.email });

            const confirmationUrl = MailService.registration(token, req.body.email, req, "BookStore Registration");
            return { savedAdmin, confirmationUrl };
        } catch (error) {
            if (error instanceof ErrorRepsonse) {
                throw error;
            } else {
                throw new ErrorRepsonse(500, 'Internal Server Error', error);
            }
        }
    };

    static authenticate = async (email, password) => {
        try {
            const admin = await adminService.findByEmail(email);
            if (!admin) {
                throw new ErrorRepsonse(400, 'Email does not exist');
            }

            if (!admin.isEnable) {
                throw new ErrorRepsonse(400, 'account has not been activated');
            }

            const validPassword = await Bcrypt.compare(password, admin.password);

            if (!validPassword) {
                throw new ErrorRepsonse(400, 'Invalid email or password');
            }

            return { admin };
        } catch (error) {
            throw error;
        }
    }


    static authenticateJWT = (req, res, next) => {
        try {
            const authorizationHeader = req.headers?.authorization;
            if (!authorizationHeader) {

                throw new ErrorRepsonse(401, 'Unauthorized');
            }

            const token = authorizationHeader.split(' ')[1];
            if (!token) {

                throw new ErrorRepsonse(401, 'Unauthorized');
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
            req.admin = decodedToken;
            next();
        } catch (err) {
            if (err.message === 'Unauthorized') {
                throw new ErrorRepsonse(401, 'Unauthorized');
            }
            else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
                throw new ErrorRepsonse(403, 'Invalid token');
            } else {
                console.error('Error :', err.message);
                throw new ErrorRepsonse(500, 'Internal Server Error');
            }
        }
    };

    static isAdmin = (req, res, next) => {
        if (req.admin && req.admin.role === 'Admin') {
            next();
        } else {
            throw new ErrorRepsonse(403, 'Unauthorized');
        }
    };

    static confirmRegistration = async (req, res) => {
        const { token } = req.params;

        // Tìm token trong collection TokenRegistration
        const tokenRegistration = await tokenRegistration.findOne({ token })
            .populate('adminEmail')
            .exec();

        if (!tokenRegistration) {
            return res.status(400).send('Invalid Token');
        }

        // Kiểm tra token đã hết hạn hay chưa
        if (tokenRegistration.expiresAt < Date.now()) {
            await tokenRegistration.deleteOne({ token });
            return res.status(400).send('Token has expired');
        }

        // Kích hoạt tài khoản người dùng
        const admin = tokenRegistration.adminEmail;
        admin.isEnabled = true;
        await admin.save();

        // Xóa token khỏi collection TokenRegistration
        await tokenRegistration.deleteOne({ token });

        return { admin };
    };


}



export default AuthenticationService 