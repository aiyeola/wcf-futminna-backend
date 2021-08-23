import express from 'express';
import swagger from 'swagger-ui-express';

import index from './api/index';
import swaggerDoc from '../docs/index';

const router = express.Router();

router.use('/api/v1', index);

router.use(
  '/api/docs',
  swagger.serve,
  swagger.setup(swaggerDoc, {
    explorer: true,
  }),
);

router.use((_err, _req, _res, next) => {
  if (_err.name === 'JsonWebTokenError') {
    return _res.status(400).json({
      status: 400,
      errors: "Server can't handle the request currently",
    });
  }

  return next(_err);
});

export default router;
