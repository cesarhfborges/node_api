import {NextFunction, Response, Request} from 'express';
import jwt from 'jsonwebtoken';

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization: string[] | undefined = req.headers['authorization']?.split(' ');
  const chavePrivada = process.env.CLIENT_SECRET ?? '';
  if (authorization?.length !== 2 || authorization[0] !== 'Bearer') {
    return res.status(400).json({
      message: 'token type is required.'
    }).end();
  }
  jwt.verify(authorization[1], chavePrivada, (err: any, userInfo: any) => {
    if (err) {
      return res.status(403).json({
        message: 'authentication required.'
      }).end();
    }
    // @ts-ignore
    req.user = userInfo;
    next();
  });
};