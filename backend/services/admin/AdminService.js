import Admin from "../../models/Auth/Admin.js";

import AdminServiceImp from './AdminServiceImp.js'
const adminService = new AdminServiceImp();

class AdminService {
    async findById(id) {
        const admin = await adminService.findById(id);
        return admin;
    }

    async findByEmail(email) {
        const admin = await adminService.findByEmail(email);
        return admin;
    }

    async getAllAdmins() {
        const admins  = await adminService.getAllAdmins();
        return admins;
    }
    async createAdmin(admin) {
        return await adminService.createAdmin(admin);
    }
    async updateAdmin(id, adminData) {
        return await adminService.updateAdmin(id, adminData);
    }
    async deleteAdmin(id) {
        await adminService.deleteAdmin(id);
    }
}

export default AdminService;