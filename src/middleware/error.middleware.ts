import {NextFunction, Request, Response} from 'express';
import ErrorResponse from '../interfaces/ErrorResponse';
import {CONFIG} from "../config/config";

export function errorHandler(err: any, req: Request, res: Response<ErrorResponse>, _next: NextFunction) {
  console.log('errorHandler: ', err);
  const statusCode = err.statusCode ?? 500;
  const body: any = {
    message: err.message,
    status: statusCode,
  }
  if (CONFIG.app.dev) {
    body.stack = err.stack;
  }
  return res.status(statusCode).json(body);
}