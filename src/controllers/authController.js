import Response from 'utils/response';

export default class Users {
  static async test(_, res, next) {
    try {
      const data = {
        firstName: 'test',
      };

      return Response.customResponse(res, 200, data);
    } catch (error) {
      return next(error);
    }
  }
}
