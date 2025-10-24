import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(5001),
  MONGODB_URI: z.string().nonempty("MONGODB_URI is required"),
  JWT_SECRET: z.string().nonempty("JWT_SECRET is required"),
  JWT_ALGO: z.string().default("HS256"),

  LOG_LEVEL: z.string().default("info"),

  AGENDA_DB_COLLECTION: z.string().default("agendaJobs"),
  AGENDA_POOL_TIME: z.string().default("10 seconds"),
  AGENDA_CONCURRENCY: z.coerce.number().default(5),

  AGENDASH_USER: z.string().default("agendash"),
  AGENDASH_PASS: z.string().default("123456"),

  MAILGUN_API_KEY: z.string().optional(),
  MAILGUN_USERNAME: z.string().optional(),
  MAILGUN_DOMAIN: z.string().optional(),
});
