import express, { type Application, type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Logger from './logger.js';

export default async ({ app }: { app: Application }): Promise<void> => {
  // Enable CORS
  app.use(cors());

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // HTTP request logging using morgan + winston
  app.use(morgan('combined', {
    stream: {
      write: (message: string) => Logger.info(message.trim()),
    },
  }));

  // Health check route
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
  });

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Not Found' });
  });

  // Error handler
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const status = (err as any).status || 500;
    const message = err.message || 'Internal Server Error';
    Logger.error(`Error ${status}: ${message}`, { stack: err.stack });
    res.status(status).json({ message });
  });

  Logger.info('✌️ Express loaded');
};