import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import morgan from "morgan";
import Logger from "./logger.js";

export default async ({ app }: { app: Application }): Promise<void> => {
  // Enable CORS
  app.use(cors());

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // HTTP request logging using morgan + winston
  app.use(
    morgan("combined", {
      stream: {
        write: (message: string) => Logger.info(message.trim()),
      },
    })
  );

  // Health check route
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "OK" });
  });

  Logger.info("✌️ Express loaded");
};
