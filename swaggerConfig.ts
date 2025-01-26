import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API de Gestion de Bajas',
    description: 'Permite gestionar las bajas tecnicas de los equipos de la empresa'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.ts','./src/features/User/schema.ts'];

swaggerAutogen()(outputFile,endpointsFiles, doc);



