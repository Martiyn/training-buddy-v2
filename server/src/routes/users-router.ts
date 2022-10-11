import express from 'express';
import { User } from '../../../src/Utils/users-model.js';
import { sendErrorResponse } from '../backend-utils.js';
import { Repository } from '../dao/repository-model.js';

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

router.post('/', async function (req, res) {
    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    const newUser = req.body;
    try {
        const created = await usersRepo.create(newUser);
        res.json(created);
    } catch (err) {
        console.error(`Unable to create user: ${newUser.firstName}.`);
        console.error(err);
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
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

export default router