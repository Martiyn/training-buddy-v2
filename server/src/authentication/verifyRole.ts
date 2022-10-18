import { ForbiddenError } from '../model/errors.js';
import { UserRepository } from '../dao/user-repository.js';
import { RequestWithUserId } from './verifyToken.js';
import { Response, NextFunction } from 'express';
import { UserRole } from '../../../src/Utils/users-model.js';


export default function verifyRole(roles) {
    return async function (req: RequestWithUserId, res: Response, next: NextFunction) {
        const userRepo = req.app.locals.usersRepo as UserRepository;
        try {
            const user = await userRepo.findById(req.userId);
            if (!roles.includes(UserRole[user.role])) {
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