import express from 'express';
import { appRouter } from './router';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerConfig from '../swaggerConfig';
import { Models } from './utils';
import { PluginManager } from './core/PluginManager';
import { PDFReportPlugin } from './plugins/PDFReportPlugin';

/**
 * Creates and configures an Express application.
 *
 * @param {Models} appModels - The models to be used in the application.
 * @returns {express.Application} The configured Express application.
 */

dotenv.config();

export const createApp = (appModels: Models): express.Application => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.disable('x-powered-by');

  const pluginManager = new PluginManager(app);
  pluginManager.register(new PDFReportPlugin());
  pluginManager.mountRoutes();

  const port = process.env.PORT || 3000;

  const swaggerSpec = swaggerJsdoc(swaggerConfig);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api', appRouter(appModels));

  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    console.log(`Swagger docs are available at http://localhost:${port}/api-docs`);
    pluginManager.startAll();
  });

  return app;
};
