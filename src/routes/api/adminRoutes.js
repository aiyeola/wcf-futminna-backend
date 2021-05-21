import express from 'express';

import method from 'utils/method';
import UserController from 'controllers/authController';

const router = express.Router();

router.route('/createAdmin').post(UserController.createAdmin).all(method);

export default router;
