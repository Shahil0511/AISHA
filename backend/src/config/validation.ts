import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(5000),
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

  // ✅ Add new required keys
  REDIS_URL: z.string().nonempty("REDIS_URL is required"),
  SMTP_HOST: z.string().nonempty("SMTP_HOST is required"),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().nonempty("SMTP_USER is required"),
  SMTP_PASS: z.string().nonempty("SMTP_PASS is required"),
  OTP_EXPIRES_IN_MIN: z.coerce.number().default(10),
});
