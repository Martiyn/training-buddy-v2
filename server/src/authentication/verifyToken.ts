import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type RequestWithUserId<P = any, ResBody = any, ReqBody = any, ReqQuery = qs.ParsedQs, Locals extends Record<string, any> = Record<string, any>> =
    Request<P, ResBody, ReqQuery, Locals> & { userId: string };

export default function verifyToken(req: RequestWithUserId, res: Response, next: NextFunction) {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        next({ status: 401, message: `Unauthorized` });
        return;
    }
    const segments = tokenHeader.split(' ');
    if (segments.length !== 2 || segments[0].trim() !== 'Bearer' || segments[1].trim().length < 80) {
        next({ status: 401, message: `No access token provided.` });
        return;
    }
    const token = segments[1].trim();

    jwt.verify(token, 'secret', function (error, decoded: { id: string }) {
        if (error) next({ status: 403, message: `Failed to authenticate token.`, error });
        else {
            req.userId = decoded.id;
            next();
        }
    });
}