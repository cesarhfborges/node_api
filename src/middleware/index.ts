import { notFound } from './not-found.middleware';
import { errorHandler } from './error.middleware';
import { jwtMiddleware } from './jwt.middleware';

export const middlewares = { notFound, errorHandler, jwtMiddleware };