import { Router } from 'express';
import { userRouter } from './features/User/router';
import { technicianRouter } from './features/Technician/router';

export const appRouter = () => {
  const router = Router();
  router.use('/user', userRouter());
  router.use('/technician', technicianRouter());
  return router;
};
