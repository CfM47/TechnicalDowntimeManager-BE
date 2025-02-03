import express from 'express';
import { appRouter } from './router';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerConfig from '../swaggerConfig';
import { Models } from './utils';

/**
 * Creates and configures an Express application.
 *
 * @param {Models} appModels - The models to be used in the application.
 * @returns {express.Application} The configured Express application.
 */

dotenv.config();

/**
 * A function to create and configure an Express application with predefined middleware, routes, and settings.
 *
 * @function
 * @param {Models} appModels - The domain models used for configuring the application and its API routes.
 * @returns {express.Application} Returns the configured Express application instance.
 *
 * @description
 * This function initializes an Express application. It sets up JSON parsing, cross-origin resource sharing (CORS),
 * and disables the "x-powered-by" header for security purposes. Swagger-based API documentation is hosted
 * under the `/api-docs` route, and application APIs are provided under the `/api` route. The server listens
 * on a specified port, which defaults to `3000` if not provided through the environment variables.
 */
export const createApp = (appModels: Models): express.Application => {
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

  return app;
};
