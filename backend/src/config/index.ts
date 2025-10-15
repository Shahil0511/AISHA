import dotenv from 'dotenv';
import process from 'process';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the correct .env file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV}`;
const envFound = dotenv.config({ path: envFile });

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`⚠️  Missing required environment variables: ${missingEnvVars.join(', ')}  ⚠️`);
}

export default {
  port: parseInt(process.env.PORT ?? '5001', 10),
  databaseURL: process.env.MONGODB_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  jwtAlgorithm: process.env.JWT_ALGO || 'HS256',
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION || 'agendaJobs',
    pooltime: process.env.AGENDA_POOL_TIME || '10 seconds',
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY ?? '5', 10),
  },
  agendash: {
    user: process.env.AGENDASH_USER || 'agendash',
    password: process.env.AGENDASH_PASS || '123456',
  },
  api: {
    prefix: '/api',
  },
  emails: {
    apiKey: process.env.MAILGUN_API_KEY || '',
    apiUsername: process.env.MAILGUN_USERNAME || '',
    domain: process.env.MAILGUN_DOMAIN || '',
  },
};