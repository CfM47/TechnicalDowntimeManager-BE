import express from 'express';
import { appRouter } from './router';

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.disable("x-powered-by");
  const port = 5000;

  app.use("/" , appRouter());

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}