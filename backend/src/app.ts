import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import loaders from "./loaders/index.js";
import authRoutes from "./modules/auth/auth.routes.js";
import Logger from "./loaders/logger.js";

async function createApp(): Promise<Application> {
  const app = express();

  // Initialize all loaders (DB, middleware, etc.)
  await loaders({ expressApp: app });

  // Base route
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      status: "success",
      message: "Welcome to the API 🚀",
      version: "1.0.0",
    });
  });

  // Auth routes
  app.use("/api/auth", authRoutes);

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Not Found" });
  });

  // Error handler
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const status = (err as any).status || 500;
    const message = err.message || "Internal Server Error";
    Logger.error(`Error ${status}: ${message}`, { stack: err.stack });
    res.status(status).json({ message });
  });

  return app;
}

export default createApp;
