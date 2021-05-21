import Db from 'services/index';
import Response from 'utils/response';

export default class Users {
  static async createAdmin(req, res, next) {
    try {
      const data = await Db.createAdmin({
        username: 'Amy Almon',
        password: '1234',
        userRole: 'Developer',
        isAllowed: true,
      });

      return Response.customResponse(res, 200, data);
    } catch (error) {
      return next(error);
    }
  }
}
