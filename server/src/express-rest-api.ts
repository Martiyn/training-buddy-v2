import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoute from "../src/routes/users.js"
import exerciseRoute from "../src/routes/exercises.js"

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRoute);
app.use("/exercises", exerciseRoute);
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})