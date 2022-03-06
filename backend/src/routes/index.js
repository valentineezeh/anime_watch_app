import express from 'express';
import authRouter from './apiRoutes/authRoutes';
import crudRouter from './apiRoutes/crudRoutes';

// fire up express router
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Valentine Training API.'
  });
});

router.use('/api', authRouter);

router.use('/api', crudRouter);

export default router;
