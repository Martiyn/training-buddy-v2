import express from 'express';
import { promises } from 'fs';
import sendErrorResponse from '../backend-utils.js';

const router = express.Router();
const exercisesDb = 'exercises.json';
let nextId = 4;

router.get("/", async (req, res) => {
    try {
        const exercisesData = await promises.readFile(exercisesDb)
        const exercises = JSON.parse(exercisesData.toString());
        res.json(exercises);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});
router.get("/:exerciseId", async (req, res) => {
    const exerciseId = req.params.exerciseId
    try {
        const exercisesData = await promises.readFile(exercisesDb)
        const exercises = JSON.parse(exercisesData.toString());
        const exercise = exercises.find((u) => {
            return u.id === parseInt(exerciseId)
        });
        res.json(exercise);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.post('/', async function (req, res) {
    const newexercise = req.body;
    try {
        const exercisesData = await promises.readFile(exercisesDb)
        const exercises = JSON.parse(exercisesData.toString());
        newexercise.id = ++nextId;
        exercises.push(newexercise);
        try {
            promises.writeFile(exercisesDb, JSON.stringify(exercises));
            res.json(newexercise);
        } catch (err) {
            console.error(`Unable to create exercise: ${newexercise.firstName}.`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid exercise data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.put('/:exerciseId', async function (req, res) {
    const exerciseId = req.params.exerciseId;
    const editedexercise = req.body;
    try {
        const exercisesData = await promises.readFile(exercisesDb)
        const exercises = JSON.parse(exercisesData.toString());
        exercises.find((u, i) => {
            if (u.id === parseInt(exerciseId)) {
                exercises[i] = editedexercise
            }
        });
        try {
            promises.writeFile(exercisesDb, JSON.stringify(exercises));
            res.json(editedexercise);
        } catch (err) {
            console.error(`Unable to edit exercise: ${editedexercise.firstName}.`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid exercise data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});
router.delete('/:exerciseId', async function (req, res) {
    const exerciseId = req.params.exerciseId;
    try {
        const exercisesData = await promises.readFile(exercisesDb)
        const exercises = JSON.parse(exercisesData.toString());
        const remaining = exercises.filter(u => u.id !== parseInt(exerciseId))
        try {
            promises.writeFile(exercisesDb, JSON.stringify(exercises));
            res.json(remaining);
        } catch (err) {
            console.error(`Unable to delete exercise.`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid exercise data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

export default router