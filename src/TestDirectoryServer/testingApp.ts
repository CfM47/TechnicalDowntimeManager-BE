import express from 'express';
import cors from 'cors';
import { appRouter } from '../router';
import { appModels } from '../index';

const testingApp = express();
testingApp.use(express.json());
testingApp.use(cors());
testingApp.disable('x-powered-by');

testingApp.use('/api', appRouter(appModels));

export default testingApp;

//Testing server for testing lol
