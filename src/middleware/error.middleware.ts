import {NextFunction, Request, Response} from 'express';
import ErrorResponse from '../interfaces/ErrorResponse';
import Exception from "../exceptions/exception";

export function errorHandler(err: Exception, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  // console.log('errorHandler: ', err);
  // const statusCode = err.statusCode ?? 500;
  // const body: any = {
  //   message: err.message,
  //   status: statusCode,
  // }
  // if (CONFIG.app.dev) {
  //   body.stack = err.stack;
  // }
  // return res.status(statusCode).json(body);

  console.error('Cai no errorHandler');

  return res.status(err.statusCode).json({
    status: err.statusCode || 500,
    message: err.message || 'Error',
  });
}