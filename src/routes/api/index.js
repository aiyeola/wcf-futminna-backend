import express from 'express';

import adminRoutes from 'routes/api/adminRoutes';

const router = express.Router();

router.use('/admin', adminRoutes);

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
