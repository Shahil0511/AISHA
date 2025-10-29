import type { Request, Response, NextFunction } from "express";

import Logger from "../loaders/logger.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default values
  const statusCode = err.statusCode || 500;
  const status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  const message =
    err.message || "Internal Server Error. Please try again later.";

  // Log the error details
  Logger.error("🔥 Error Caught by Middleware", {
    path: req.originalUrl,
    method: req.method,
    statusCode,
    message,
    stack: err.stack,
    ...(err.code && { code: err.code }),
  });

  // Handle specific known errors gracefully
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      status: "fail",
      message: "Validation Error",
      details: err.errors || err.message,
    });
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    return res.status(409).json({
      success: false,
      status: "fail",
      message: "Duplicate key error",
      details: err.keyValue,
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      status: "fail",
      message: "Invalid or malformed token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      status: "fail",
      message: "Token expired. Please log in again.",
    });
  }

  // For unhandled operational or programming errors
  return res.status(statusCode).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
