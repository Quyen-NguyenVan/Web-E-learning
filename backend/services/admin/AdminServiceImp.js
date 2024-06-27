import AdminRepository from "../../dao/AdminRepository.js";
const AdminRepository = new AdminRepository();

class AdminServiceImp {
    async findById(id) {
        try {
            const admin = await adminRepository.findById(id);
            return admin;
        } catch (err) {
            console.error(err);
            throw new Error('Error finding user by ID');
        }
    }

    async findByEmail(email) {
        try {
            const admin = await adminRepository.findByEmail(email);
            return admin;
        } catch (err) {
            console.error(err);
            throw new Error('Error finding user by Email');
        }
    }

    async updateAdmin(id, adminData) {
        try {
            const updatedAdmin = await adminRepository.update(id, adminData);
            return updatedAdmin;
        } catch (err) {
            console.error(err);
            throw new Error('Error updating user');
        }
    }

    async createAdmin(admin) {
        try {
            const newAdmin = await adminRepository.create(admin);
            return newAdmin;
        } catch (err) {
            console.error(err);
            throw new Error('Error creating user');
        }
    }

    async deleteAdmin(id) {
        try {
            await adminRepository.delete(id);
        } catch (err) {
            console.error(err);
            throw new Error('Error deleting user');
        }
    }

    async searchAdmins(keyword) {
        try {
            const admins = await adminRepository.find({ $or: [{ firstName: { $regex: keyword, $options: 'i' } }, { lastName: { $regex: keyword, $options: 'i' } }] });
            return admins;
        } catch (err) {
            console.error(err);
            throw new Error('Error searching users');
        }
    }

    async getAllAdmins() {
        try {
            const admins = await adminRepository.findAll();
            return admins;
        } catch (err) {
            console.error(err);
            throw new Error('Error getting all users');
        }
    }
}

export default AdminServiceImp;