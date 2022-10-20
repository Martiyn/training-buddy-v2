import { useCallback, useEffect, useState } from "react";
import { Exercise, ExerciseFilterType } from "../Utils/exercise-model";
import ExerciseList from "./ExercisesList";
import ExerciseFilter from "./ExerciseFilter";
import { ExerciseApi } from "../rest-api/rest-api-client";
import { UsersApi } from "../rest-api/rest-api-client";
import ExerciseInput from "./ExerciseInput";
import "../App.css";
import { Optional } from "../Utils/shared-types";
import { Outlet, useParams } from "react-router-dom";
import { User, UserRole } from "../Utils/users-model";
import { Button } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import { useNavigate, useLocation } from "react-router-dom";

function Exercises() {
  let { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [exercises, setExercises] = useState([] as Exercise[]);
  const [userExists, setUserExists] = useState<Optional<User>>(undefined);
  const [filter, setFilter] = useState(undefined as ExerciseFilterType);
  const [editedExercise, setEditedExercise] =
    useState<Optional<Exercise>>(undefined);
  const [loggedUser, setLoggedUser] = useState<Optional<User>>(
    location.state.loggedUser
  );

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
  }, []);

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
        const updatedExercises = await ExerciseApi.findAll();
        setExercises(updatedExercises);
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
          {loggedUser?.id === userId ||
          loggedUser?.role === UserRole.Instructor ? (
            <ExerciseInput
              key={editedExercise?.id}
              userId={userId}
              editExercise={editedExercise}
              onSubmitExercise={handleSubmitExercise}
            />
          ) : null}
          <ExerciseFilter
            filter={filter}
            onFilterChange={(filter) => setFilter(filter)}
          />
          <ExerciseList
            exercises={exercises}
            userId={userId}
            filter={filter}
            loggedUser={loggedUser}
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
