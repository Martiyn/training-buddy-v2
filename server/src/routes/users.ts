import express from 'express';
import { promises } from 'fs';
import sendErrorResponse from '../backend-utils.js';

const router = express.Router();
const usersDb = 'users.json';
let nextId = 4;

router.get("/", async (req, res) => {
    try {
        const usersData = await promises.readFile(usersDb)
        const users = JSON.parse(usersData.toString());
        res.json(users);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId
    try {
        const usersData = await promises.readFile(usersDb)
        const users = JSON.parse(usersData.toString());
        const user = users.find((u) => {
            return u.id === parseInt(userId)
        });
        res.json(user);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.post('/', async function (req, res) {
    const newUser = req.body;
    try {
        const usersData = await promises.readFile(usersDb)
        const users = JSON.parse(usersData.toString());
        newUser.id = ++nextId;
        users.push(newUser);
        try {
            promises.writeFile(usersDb, JSON.stringify(users));
            res.json(newUser);
        } catch (err) {
            console.error(`Unable to create user: ${newUser.firstName}.`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.put('/:userId', async function (req, res) {
    const userId = req.params.userId;
    const editedUser = req.body;
    try {
        const usersData = await promises.readFile(usersDb)
        const users = JSON.parse(usersData.toString());
        users.find((u, i) => {
            if (u.id === parseInt(userId)) {
                users[i] = editedUser
            }
        });
        try {
            promises.writeFile(usersDb, JSON.stringify(users));
            res.json(editedUser);
        } catch (err) {
            console.error(`Unable to edit user: ${editedUser.firstName}.`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});
router.delete('/:userId', async function (req, res) {
    const userId = req.params.userId;
    try {
        const usersData = await promises.readFile(usersDb)
        const users = JSON.parse(usersData.toString());
        const remaining = users.filter(u => u.id !== parseInt(userId))
        try {
            promises.writeFile(usersDb, JSON.stringify(users));
            res.json(remaining);
        } catch (err) {
            console.error(`Unable to delete user.`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

export default router