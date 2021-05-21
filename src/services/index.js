import Admin from 'database/models/admin';
import BioData from 'database/models/biodata';

export default class Services {
  static async createAdmin(adminDetails) {
    try {
      const admin = new Admin(adminDetails);
      const newAdmin = await admin.save();
      return newAdmin;
    } catch (error) {
      throw error;
    }
  }

  static async findAdmin(param) {
    try {
      const user = await Admin.find({ username: param });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findAdminById(param) {
    try {
      const user = await Admin.find({ _id: param });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findAndUpdate(id, refreshToken) {
    try {
      const updatedAdmin = await Admin.findByIdAndUpdate(
        { _id: id },
        { $set: { refreshToken } },
      );

      return updatedAdmin;
    } catch (error) {
      throw error;
    }
  }
  static async allStudentData() {
    try {
      const data = await BioData.find();

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async insertRecord(studentDetails) {
    try {
      const record = new BioData(studentDetails);
      await record.save();
    } catch (error) {
      throw error;
    }
  }
}
