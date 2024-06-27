
import AdminService from '../services/admin/AdminService.js';

class AdminController {
  constructor() {
    this._AdminService = new AdminService();
  }

  async getAdmins(req, res) {
    try {
      const books = await this._AdminService.getAllAdmins();
      return res.status(200).json({
        status: 200,
        message: "Successfully retrieved data",
        data: books,
      });
    } catch (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Error retrieving users');
    }
  }

  async getAdminById(req, res) {
    try {
      const adminId = req.params.id;
      const admin = await this._AdminService.findById(adminId);
      if (!admin) {
        return res.status(404).json({
          status: 404,
          message: "user not found",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Successfully retrieved the user",
        data: admin,
      });
    } catch (err) {
      console.error('Error fetching the user:', err);
      return res.status(500).send('Error retrieving the user');
    }
  }

  async updateAdmin(req, res) {
    try {
      const adminEmail = req.params.email;
      const updatedadmin = req.body; // Assuming request body contains the updated book data
      await this._AdminService.updateAdmin(adminEmail, updatedadmin);
      return res.status(200).json({
        status: 200,
        message: "user updated successfully",
      });
    } catch (err) {
      console.error('Error updating the user:', err);
      return res.status(500).send('Error updating the user');
    }
  }

  async removeAdmin(req, res) {
    try {
      const adminEmail = req.params.email;
      await AdminBookService.removeAdmin(adminEmail);
      return res.status(200).json({
        status: 200,
        message: "user removed successfully",
      });
    } catch (err) {
      console.error('Error removing the user:', err);
      return res.status(500).send('Error removing the user');
    }
  }
}

export default AdminController