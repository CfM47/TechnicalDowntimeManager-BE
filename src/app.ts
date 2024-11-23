import express from 'express';
import { appRouter } from './router';
import dotenv from 'dotenv';

dotenv.config()

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.disable("x-powered-by");
  const port = process.env.PORT || 3000
  

  app.use("/" , appRouter());

  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
}