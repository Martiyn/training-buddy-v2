import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoute from "./routes/users-router.js"
import exerciseRoute from "./routes/exercises-router.js"
import { sendErrorResponse } from './backend-utils.js';
import { AuthenticationError, ForbiddenError, InvalidDataError, NotFoundError } from './model/errors.js';
import { MongoClient } from 'mongodb';
import { MongodbRepository } from './dao/mongodb-repository.js';
import { User } from '../../src/Utils/users-model.js';
import { Exercise } from '../../src/Utils/exercise-model.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRoute);
app.use("/exercises", exerciseRoute);
app.use((req, res) => {
    sendErrorResponse(req, res, 404, `This is not the page you are looking for :)`);
});
export const HOSTNAME = 'localhost';
const PORT = 4000;
const dbUrl = `mongodb://localhost:27017`;
const database = 'Training-buddy';
const exercisesCollection = 'exercises';
const usersCollection = 'users';



app.use(function (err, req, res, next) {
    console.error(err.stack);
    let status = 500;
    if (err instanceof AuthenticationError) {
        status = 401;
    } else if (err instanceof ForbiddenError) {
        status = 403;
    } else if (err instanceof NotFoundError) {
        status = 404;
    } else if (err instanceof InvalidDataError) {
        status = 400;
    }
    sendErrorResponse(req, res, err.status || status, `Error: ${err.message}`, err);
});

(async () => {
    const con = await MongoClient.connect(dbUrl);
    const db = con.db(database);
    app.locals.exercisesRepo = new MongodbRepository<Exercise>(db, exercisesCollection);
    app.locals.usersRepo = new MongodbRepository<User>(db, usersCollection);

    app.listen(PORT, HOSTNAME, () => {
        console.log(`HTTP Server listening on: http://${HOSTNAME}:${PORT}`);
    })
})();