import crypto from 'crypto';

import DB from 'services/index';
import Response from 'utils/response';
import Password from 'utils/Password';
import getBirthdays from 'utils/getBirthdays';
import SessionManager from 'utils/sessionManager';
export default class Users {
  static async createAdmin(req, res, next) {
    const data = req.body;

    try {
      const user = await DB.findAdmin(data.username);

      if (user.length !== 0) {
        return Response.conflictError(
          res,
          'username has been used to register',
        );
      }

      const obj = new Password(data);
      const hashedPassword = await obj.encryptPassword();

      data.password = hashedPassword;

      const newUser = await DB.createAdmin(data);

      newUser.password = undefined;

      return Response.customResponse(
        res,
        201,
        'New admin user created',
        newUser,
      );
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const user = await DB.findAdmin(username);

      if (user.length === 0) {
        return Response.authenticationError(
          res,
          'Invalid username or password',
        );
      }

      const match = await Password.checkPasswordMatch(
        user[0].password,
        password,
      );

      if (!match) {
        return Response.authenticationError(
          res,
          'Invalid username or password',
        );
      }

      const refreshId = user[0].id + process.env.TOKEN_SECRET;
      const salt = crypto.randomBytes(16).toString('base64');
      const hash = crypto
        .createHmac('sha512', salt)
        .update(refreshId)
        .digest('base64');

      const refreshBuffer = Buffer.from(hash).toString('base64');

      const userDetails = {
        ...user[0].toJSON(),
        refreshKey: salt,
      };

      const token = SessionManager.createSession(userDetails, res);

      return Response.customResponse(res, 200, 'Sign in successful', {
        accessToken: token,
        refreshToken: refreshBuffer,
      });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const { refreshToken, password, username } = req.body;

      if (!refreshToken) {
        return Response.badRequestError(res, 'Invalid refresh token');
      }

      const user = await DB.findAdmin(username);

      const match = await Password.checkPasswordMatch(
        user[0].password,
        password,
      );

      if (!match) {
        return Response.authenticationError(res, 'Invalid password');
      }

      const refreshBuffer = Buffer.from(refreshToken, 'base64').toString();

      const hash = crypto
        .createHmac('sha512', req.user.refreshKey)
        .update(req.user.id + process.env.TOKEN_SECRET)
        .digest('base64');

      if (hash === refreshBuffer) {
        const token = SessionManager.createSession(req.user, res);

        const refreshBuffer = Buffer.from(hash).toString('base64');

        return Response.customResponse(res, 200, 'Session refresh successful', {
          accessToken: token,
          refreshToken: refreshBuffer,
        });
      } else {
        return Response.badRequestError(res, 'Invalid refresh token');
      }
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res) {
    SessionManager.destroyToken(req.user);

    return Response.customResponse(res, 200, 'User logged out successfully');
  }

  static async bioData(req, res, next) {
    try {
      const { field } = req.query;

      if (field) {
        const fields = await DB.groupByField(field);

        return Response.customResponse(res, 200, `Grouped by ${field}`, fields);
      } else {
        const allData = await DB.allStudentData();

        return Response.customResponse(res, 200, 'All student records', {
          allData,
          total: allData.length,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async checkToken(req, res, next) {
    try {
      return Response.customResponse(res, 200, 'Current user', req.user);
    } catch (error) {
      return next(error);
    }
  }

  static async getAdmin(_, res, next) {
    try {
      const allAdmin = await DB.findAllAdmin();

      return Response.customResponse(res, 200, 'All admins', allAdmin);
    } catch (error) {
      return next(error);
    }
  }

  static async getBirthdaysInTheWeek(_, res, next) {
    try {
      const allData = await DB.allStudentData();

      getBirthdays(allData);

      // const birthdays = await DB.birthdaysByPeriod(startWeek, endWeek);
    } catch (error) {
      return next(error);
    }
  }

  static async revokeAdminAccess(req, res, next) {
    const { username } = req.body;

    try {
      await DB.findAdminAndUpdate(username);
      return Response.customResponse(res, 200, 'Admin access revoked');
    } catch (error) {
      return next(error);
    }
  }

  static async submitData(req, res, next) {
    const data = req.body;

    try {
      await DB.insertRecord(data);
      return Response.customResponse(res, 200, 'Student record inserted');
    } catch (error) {
      return next(error);
    }
  }
}
