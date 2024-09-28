import { NextFunction, Request, Response } from 'express';
import NotFound from "../exceptions/not-found";

export function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new NotFound(`Not Found - ${req.originalUrl}`);
  next(error);
}