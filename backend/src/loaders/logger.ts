import winston from "winston";
import config from "../config/index.js";
import path from "path";
import fs from "fs";

// Ensure logs directory exists
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const transports: winston.transport[] = [];

// Console logging (pretty in dev, JSON in prod)
transports.push(
  new winston.transports.Console({
    format:
      process.env.NODE_ENV !== "development"
        ? winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        : winston.format.combine(winston.format.cli(), winston.format.splat()),
  })
);

// ✅ File logging
transports.push(
  new winston.transports.File({
    filename: path.join(logDir, "app.log"),
    level: config.logs.level || "info",
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
      })
    ),
  })
);

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports,
});

export default LoggerInstance;
