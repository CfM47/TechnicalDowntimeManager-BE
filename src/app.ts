import express from 'express';
import { appRouter } from './router';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerConfig from '../swaggerConfig';
import { Models } from './utils';

dotenv.config();

export const createApp = (appModels: Models) => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.disable('x-powered-by');

  const port = process.env.PORT || 3000;

  const swaggerSpec = swaggerJsdoc(swaggerConfig);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api', appRouter(appModels));

  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    console.log(`Swagger docs are available at http://localhost:${port}/api-docs`);
  });
};
