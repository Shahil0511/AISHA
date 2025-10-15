import express from 'express';
import config from './config/index.js';
import Logger from './loaders/logger.js';
import loaders from './loaders/index.js';

async function startServer(): Promise<void> {
  try {
    const app = express();

    await loaders({ expressApp: app });

    app.listen(config.port, () => {
      Logger.info(`
################################################
🛡️  Server listening on port: ${config.port} 🛡️
################################################
      `);
    }).on('error', (err: Error) => {
      Logger.error('Failed to start server:', err);
      process.exit(1);
    });
  } catch (error) {
    Logger.error('Error during server startup:', error);
    process.exit(1);
  }
}

startServer();