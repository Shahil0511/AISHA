import express from 'express';
import expressLoader from './express.js';
import mongooseLoader from './mongoose.js';
import jobsLoader from './agenda.js';
import Logger from './logger.js';

interface ExpressLoaderOptions {
  expressApp: express.Application; 
}


export default async ({ expressApp }: ExpressLoaderOptions) => {
  expressApp.use(express.json());

  const db = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected');

  const agenda = jobsLoader({ mongoConnection: db });
  Logger.info('✌️ Agenda loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');

  return { app: expressApp, agenda };
};
