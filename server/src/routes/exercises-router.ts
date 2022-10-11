import express from 'express';
import { Exercise } from '../../../src/Utils/exercise-model.js';
import { sendErrorResponse } from '../backend-utils.js';
import { Repository } from '../dao/repository-model.js';

const router = express.Router();

router.get("/", async (req, res) => {
    const exercisesRepo: Repository<Exercise> = req.app.locals.exercisesRepo;
    try {
        const exercises = await exercisesRepo.findAll();
        res.json(exercises);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get("/:exerciseId", async (req, res) => {
    const exercisesRepo: Repository<Exercise> = req.app.locals.exercisesRepo;
    const exerciseId = req.params.exerciseId
    try {
        const exercise = await exercisesRepo.findById(exerciseId);
        res.json(exercise);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.post('/', async function (req, res) {
    const exercisesRepo: Repository<Exercise> = req.app.locals.exercisesRepo;
    const newexercise = req.body;
    try {
        const created = await exercisesRepo.create(newexercise);
        res.json(created);
    } catch (err) {
        console.error(`Unable to create exercise: ${newexercise.firstName}.`);
        console.error(err);
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.put('/:exerciseId', async function (req, res) {
    const exercisesRepo: Repository<Exercise> = req.app.locals.exercisesRepo;
    const editedexercise = req.body;

    try {
        const updated = await exercisesRepo.update(editedexercise);
        res.json(updated);
    } catch (error) {
        console.error(`Unable to update exercise.`);
        sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
    }
});

router.delete('/:exerciseId', async function (req, res) {
    const exercisesRepo: Repository<Exercise> = req.app.locals.exercisesRepo;
    const exerciseId = req.params.exerciseId;
    try {
        const deleted = await exercisesRepo.deleteById(exerciseId);
        res.json(deleted);
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid exercise data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

export default router