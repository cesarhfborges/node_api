import {NextFunction, Request, Response} from 'express';
import ErrorResponse from '../interfaces/ErrorResponse';
import {CONFIG} from "../config/config";

export function errorHandler(err: any, req: Request, res: Response<ErrorResponse>, _next: NextFunction) {
  const statusCode = err.statusCode ? err.statusCode : (res.statusCode !== 200 ? res.statusCode : 500);
  console.log('errorHandler: ', err);

  return res.status(statusCode).json({
    message: err.message,
    stack: CONFIG.app.dev ? '🥞' : err.stack,
  });
}