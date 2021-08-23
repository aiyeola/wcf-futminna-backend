import express from 'express';

import method from 'utils/method';
import User from 'controllers/authController';
import AdminValidation from 'validation/adminValidation';
import verify from 'middlewares/auth';

const router = express.Router();

router
  .route('/sign-up')
  .post(AdminValidation.validateSignUp, User.createAdmin)
  .all(method);

router
  .route('/login')
  .post(AdminValidation.validateSignIn, User.login)
  .all(method);

router.route('/auth/refresh').post(verify, User.refreshToken).all(method);

router.route('/logout').post(verify, User.logout).all(method);

router.route('/bio-data').get(verify, User.bioData).all(method);

router.route('/check-user').get(verify, User.checkToken).all(method);

router.route('/admin').get(verify, User.getAdmin).all(method);

router.route('/birthdays').get(verify, User.getBirthdaysInTheWeek).all(method);

router.route('/revoke-access').patch(verify, User.revokeAdminAccess);

export default router;
