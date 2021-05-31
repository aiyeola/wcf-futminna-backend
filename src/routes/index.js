import express from 'express';
import swagger from 'swagger-ui-express';

import index from 'routes/api/index';
import swaggerDoc from 'docs/index';

const router = express.Router();

router.use('/api/v1', index);

router.use(
  '/api/docs',
  swagger.serve,
  swagger.setup(swaggerDoc, {
    explorer: true,
  }),
);

export default router;
