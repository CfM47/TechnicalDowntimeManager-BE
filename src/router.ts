import {Router} from 'express';
import { userRouter } from './features/User/router';

export const appRouter = () => {
    const router = Router()
    router.use("/user", userRouter()) 
    return router
}