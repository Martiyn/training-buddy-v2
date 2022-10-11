import React, { useCallback, useEffect, useState } from "react";
import {
  Exercise,
  ExerciseFilterType,
} from "../Utils/exercise-model";
import ExerciseList from "./ExercisesList";
import ExerciseFilter from "./ExerciseFilter";
import { ExerciseApi } from "../rest-api-client";
import ExerciseInput from "./ExerciseInput";
import "../App.css";
import { Optional } from "../Utils/shared-types";
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { User } from "../Utils/users-model";

function Exercises() {
  let { userId } = useParams();
  const users = useLoaderData() as User[];
  const [exercises, setExercises] = useState([] as Exercise[]);
  const [filter, setFilter] = useState(undefined as ExerciseFilterType);
  const [editedExercise, setEditedExercise] =
    useState<Optional<Exercise>>(undefined);

  const userExists = users.find((u) => {
    return u.id === userId;
  });

  useEffect(() => {
    ExerciseApi.findAll()
      .then((allExercises) => {
        setExercises(allExercises);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [exercises]);

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
  }, [exercises]);

  const handleSubmitExercise = useCallback(async (exercise: Exercise) => {
    try {
      if (exercise.id) {
        const updated = await ExerciseApi.update(exercise);
        setExercises((exercises) =>
          exercises.map((ex) => (ex.id === updated.id ? updated : ex))
        );
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
        </>
      )}
    </div>
  );
}

export default Exercises;
