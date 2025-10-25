import config from "./config/index.js";
import Logger from "./loaders/logger.js";
import createApp from "./app.js";

async function startServer(): Promise<void> {
  try {
    const app = await createApp();

    app
      .listen(config.port, () => {
        Logger.info(`🛡️ Server listening on port: ${config.port} 🛡️`);
      })
      .on("error", (err: Error) => {
        Logger.error("Failed to start server:", err);
        process.exit(1);
      });
  } catch (error) {
    Logger.error("Error during server startup:", error);
    process.exit(1);
  }
}

startServer();
