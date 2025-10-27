import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.Redis_URL || "redis://127.0.0.1:6379",
});

redisClient.on("error", (error) => console.error("Redis Client Error", error));

await redisClient.connect();

export default redisClient;
