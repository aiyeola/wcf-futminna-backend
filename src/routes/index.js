import express from 'express';
import index from 'routes/api/index';

const router = express.Router();

router.use('/api/v1', index);

export default router;
