import SessionManager from 'utils/sessionManager';
import Response from 'utils/response';
import DB from 'services/index';

const verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const payload = await SessionManager.decodeToken({ token });

    // check db for updated isAdmin status
    const admin = await DB.findAdmin(payload.username);

    payload.userRole = admin[0].userRole;
    payload.isAdmin = admin[0].isAdmin;

    req.user = payload;
    next();
  } catch (error) {
    return Response.authenticationError(res, error.message);
  }
};

export default verify;
