import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {CONFIG} from "../config/config";

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization: string[] | undefined = req.headers['authorization']?.split(' ');
  const chavePrivada = CONFIG.jwt.client_secret ?? '';
  if (authorization?.length !== 2 || authorization[0] !== 'Bearer') {
    return res.status(400).json({
      message: 'token type is required.'
    }).end();
  }
  jwt.verify(authorization[1], chavePrivada, (err: any, userInfo: any) => {
    if (err) {
      return res.status(401).json({
        message: 'authentication required.'
      }).end();
    }
    // @ts-ignore
    req.currentUser = userInfo;
    next();
  });
}