import Admin from '../models/Auth/Admin';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createDefaultAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        let admin = await Admin.findOne({ email: adminEmail });

        if (!admin) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);

            admin = new Admin({
                name: 'Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin'
            });

            await admin.save();
            console.log('Default admin created');
        } else {
            console.log('Admin already exists');
        }
    } catch (err) {
        console.error('Error creating default admin', err);
    }
};

export default createDefaultAdmin;
