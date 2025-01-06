import { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0'
    }
  },
  apis: ['./src/features/**/*.ts'] // Path to the API docs
};

export default options;
