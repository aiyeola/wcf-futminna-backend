import Admin from 'database/models/admin';
import BioData from 'database/models/biodata';

export default class Services {
  static async createAdmin(adminDetails) {
    try {
      const admin = new Admin(adminDetails);
      return await admin.save();
    } catch (error) {
      throw error;
    }
  }

  static async findAdmin(param) {
    try {
      return await Admin.find({ username: param });
    } catch (error) {
      throw error;
    }
  }

  static async findAllAdmin() {
    try {
      return await Admin.find({}, 'id username userRole isAdmin');
    } catch (error) {
      throw error;
    }
  }

  static async findAdminById(id) {
    try {
      return await Admin.find({ _id: id });
    } catch (error) {
      throw error;
    }
  }

  static async allStudentData() {
    try {
      return await BioData.find();
    } catch (error) {
      throw error;
    }
  }

  static async insertRecord(studentDetails) {
    try {
      const record = new BioData(studentDetails);
      return await record.save();
    } catch (error) {
      throw error;
    }
  }
}
