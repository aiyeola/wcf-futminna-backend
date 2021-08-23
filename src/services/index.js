import Admin from '../database/models/admin';
import BioData from '../database/models/biodata';

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

  static async allStudentData() {
    try {
      return await BioData.find({});
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

  static async groupByField(field) {
    try {
      return await BioData.aggregate([
        {
          $group: {
            _id: `$${field}`,
            total: { $sum: 1 },
          },
        },
      ]);
    } catch (error) {
      throw error;
    }
  }

  static async birthdaysByPeriod(startPeriod, endPeriod) {
    try {
      return BioData.find({
        dob: {
          $gte: startPeriod,
          $lte: new Date(),
        },
      }).exec();

      // return BioData.find()
      //   .where('dob')
      //   .gt(startPeriod)
      //   .lt(endPeriod)
      //   .sort('dob')
      //   .select('name dob')
      //   .exec();
    } catch (error) {
      throw error;
    }
  }

  static async findAdminAndUpdate(field) {
    try {
      return await Admin.findOneAndUpdate(
        { username: field },
        { isAdmin: false },
        { new: true },
      );
    } catch (error) {
      throw error;
    }
  }
}
