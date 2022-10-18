import { ForbiddenError } from './../model/errors';
import { UserRepository } from './../dao/user-repository';
import { RequestWithUserId } from './verifyToken';
import { Response, NextFunction } from 'express';


export default function verifyRole(roles) {
    return async function (req: RequestWithUserId, res: Response, next: NextFunction) {
        const userRepo = req.app.locals.usersRepo as UserRepository;
        try {
            const user = await userRepo.findById(req.userId);
            if (!roles.includes(user.role)) {
                next(new ForbiddenError(`Access not allowed`));
                return;
            }
            next();
        } catch (err) {
            next(err);
            return;
        }
    }
}