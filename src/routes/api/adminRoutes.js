import express from 'express';

import method from 'utils/method';
import UserController from 'controllers/authController';

const router = express.Router();

router.route('/test').get(UserController.test).all(method);

export default router;
