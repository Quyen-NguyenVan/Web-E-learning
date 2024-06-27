import Admin from '../models/Auth/Admin.js';
import admin from '../models/Auth/Admin.js';

class AdminRepository {
    constructor() {
    }

    async findAll() {
        const Admins = await Admin.find();
        return Admins;
    }

    async findById(id) {
        try {
            const admin = await Admin.findById(id);
            return admin;
        } catch (err) {
            console.error(err);
            throw new Error('Error finding admin by ID');
        }
    }

    async findByEmail(email) {
        try {
            const admin = await Admin.findOne({ email });
            return admin;
        } catch (err) {
            console.error(err);
            throw new Error('Error finding admin by email');
        }
    }

    async create(AdminData) {
        try {
            const admin = await Admin.create(AdminData);
            return admin;
        } catch (err) {
            console.error(err);
            throw new Error('Error creating admin');
        }
    }

    async update(id, AdminData) {
        try {
            const admin = await Admin.findByIdAndUpdate(id, AdminData, { new: true });
            return admin;
        } catch (err) {
            console.error(err);
            throw new Error('Error updating admin');
        }
    }

    async delete(id) {
        try {
            const admin = await Admin.findByIdAndDelete(id);
            return admin;
        } catch (err) {
            console.error(err);
            throw new Error('Error deleting admin');
        }
    }

}

export default AdminRepository;