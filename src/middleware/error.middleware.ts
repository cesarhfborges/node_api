import {NextFunction, Request, Response} from 'express';
import ErrorResponse from '../interfaces/ErrorResponse';
import {CONFIG} from "../config/config";

export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, _next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: CONFIG.app.dev ? '🥞' : err.stack,
  });
}