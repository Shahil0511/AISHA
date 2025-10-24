import dotenv from "dotenv";
import process from "process";
import { envSchema } from "./validation.js";

// Set default NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Load correct .env file
const envFile = `.env.${process.env.NODE_ENV}`;
const envFound = dotenv.config({ path: envFile });

if (envFound.error) {
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

// Validate using Zod
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

// ✅ Use the validated parsed.data, not process.env
export default {
  port: parsed.data.PORT,
  databaseURL: parsed.data.MONGODB_URI,
  jwtSecret: parsed.data.JWT_SECRET,
  jwtAlgorithm: parsed.data.JWT_ALGO,
  logs: {
    level: parsed.data.LOG_LEVEL,
  },
  agenda: {
    dbCollection: parsed.data.AGENDA_DB_COLLECTION,
    pooltime: parsed.data.AGENDA_POOL_TIME,
    concurrency: parsed.data.AGENDA_CONCURRENCY,
  },
  agendash: {
    user: parsed.data.AGENDASH_USER,
    password: parsed.data.AGENDASH_PASS,
  },
  api: {
    prefix: "/api",
  },
  emails: {
    apiKey: parsed.data.MAILGUN_API_KEY,
    apiUsername: parsed.data.MAILGUN_USERNAME,
    domain: parsed.data.MAILGUN_DOMAIN,
  },
} as const;
