import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../../src/Utils/users-model.js';
import { sendErrorResponse } from '../backend-utils.js';
import { Repository } from '../dao/repository-model.js';
import { UserRepository } from '../dao/user-repository.js';
import Credentials from '../model/auth.js';
import { AuthenticationError, InvalidDataError } from '../model/errors.js';

const router = express.Router();

router.get("/", async (req, res) => {
    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    try {
        const users = await usersRepo.findAll();
        res.json(users);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get("/:userId", async (req, res) => {
    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    const userId = req.params.userId
    try {
        const user = await usersRepo.findById(userId);
        res.json(user);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.post('/', async function (req, res, next) {
    const usersRepo: UserRepository = req.app.locals.usersRepo;
    const newUser = req.body;
    try {
        const found = await usersRepo.findByUsername(newUser.username);
        if (found) {
            next(new InvalidDataError(`Username already taken: "${newUser.username}"`));
        }

        newUser.password = await bcrypt.hash(newUser.password, 8);
        const created = await usersRepo.create(newUser);
        delete created.password;

        res.status(201).location(`/users/${created.id}`).json(created);
    } catch (err) {
        next(err);
    }
});

router.put('/:userId', async function (req, res) {
    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    const editedUser = req.body;

    try {
        const updated = await usersRepo.update(editedUser);
        res.json(updated);
    } catch (error) {
        console.error(`Unable to update user.`);
        sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
    }
});

router.delete('/:userId', async function (req, res) {
    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    const userId = req.params.userId;
    try {
        const deleted = await usersRepo.deleteById(userId);
        res.json(deleted);
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.post('/login', async (req, res, next) => {
    const usersRepo: UserRepository = req.app.locals.usersRepo;
    const credentials = req.body as Credentials;

    try {
        const user = await usersRepo.findByUsername(credentials.username);
        if (!user) {
            next(new AuthenticationError(`Username or password is incorrect.`));
            return;
        }
        const passIsValid = await bcrypt.compare(credentials.password, user.password);
        if (!passIsValid) {
            next(new AuthenticationError(`Username or password is incorrect.`));
            return;
        }
        const token = jwt.sign({ id: user.id }, 'secret', {
            expiresIn: '1h' //expires in 1h
        });
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    }

});

export default router