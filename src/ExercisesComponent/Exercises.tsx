import { useCallback, useEffect, useState } from "react";
import { Exercise, ExerciseFilterType } from "../Utils/exercise-model";
import ExerciseList from "./ExercisesList";
import ExerciseFilter from "./ExerciseFilter";
import { ExerciseApi } from "../rest-api-client";
import { UsersApi } from "../rest-api-client";
import ExerciseInput from "./ExerciseInput";
import "../App.css";
import { Optional } from "../Utils/shared-types";
import { Outlet, useParams } from "react-router-dom";
import { User } from "../Utils/users-model";
import { Button } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import { useNavigate } from "react-router-dom";

function Exercises() {
  let { userId } = useParams();
  const [exercises, setExercises] = useState([] as Exercise[]);
  const [userExists, setUserExists] = useState<Optional<User>>(undefined);
  const [filter, setFilter] = useState(undefined as ExerciseFilterType);
  const [editedExercise, setEditedExercise] =
    useState<Optional<Exercise>>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    UsersApi.findById(userId)
      .then((user) => {
        setUserExists(user);
      })
      .catch((err) => {
        console.log(err);
      });
    ExerciseApi.findAll()
      .then((allExercises) => {
        setExercises(allExercises);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    editedExercise?.text,
    editedExercise?.type,
    editedExercise?.hold,
    editedExercise?.reps,
    editedExercise?.status,
  ]);

  async function handleDeleteExercise(exercise: Exercise) {
    try {
      await ExerciseApi.deleteById(exercise.id);
      setExercises((exercises) =>
        exercises.filter((ex) => ex.id !== exercise.id)
      );
    } catch (err) {
      console.log(err);
    }
  }

  const handleEditExercise = useCallback((exercise: Exercise) => {
    setEditedExercise(exercise);
  }, []);

  const handleSubmitExercise = useCallback(async (exercise: Exercise) => {
    try {
      if (exercise.id) {
        await ExerciseApi.update(exercise);
        const updatedList = await ExerciseApi.findAll();
        setExercises(updatedList);
        setEditedExercise(undefined);
      } else {
        const created = await ExerciseApi.create(exercise);
        setExercises((exercises) => exercises.concat(created));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="Container">
      {userExists === undefined ? (
        <div id="detail">
          <Outlet />
        </div>
      ) : (
        <>
          <ExerciseInput
            key={editedExercise?.id}
            userId={userId}
            editExercise={editedExercise}
            onSubmitExercise={handleSubmitExercise}
          />
          <ExerciseFilter
            filter={filter}
            onFilterChange={(filter) => setFilter(filter)}
          />
          <ExerciseList
            exercises={exercises}
            userId={userId}
            filter={filter}
            onUpdateExercise={handleSubmitExercise}
            onDeleteExercise={handleDeleteExercise}
            onEditExercise={handleEditExercise}
          />
          <Button
            sx={{
              marginTop: 5,
            }}
            variant="contained"
            endIcon={<UndoIcon />}
            onClick={() => navigate(-1)}
            type="button"
          >
            Go back
          </Button>
        </>
      )}
    </div>
  );
}

export default Exercises;
