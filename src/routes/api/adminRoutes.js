import express from 'express';

import method from 'utils/method';
import UserController from 'controllers/authController';
import AdminValidation from 'validation/adminValidation';
import verify from 'middlewares/auth';

const router = express.Router();

router
  .route('/signup')
  .post(AdminValidation.validateSignup, UserController.createAdmin)
  .all(method);

router
  .route('/login')
  .post(AdminValidation.validateSignIn, UserController.login)
  .all(method);
router
  .route('/auth/refresh')
  .post(verify, UserController.refreshToken)
  .all(method);

router.route('/logout').post(verify, UserController.logout).all(method);

export default router;
