import React, { useCallback, useEffect, useState } from "react";
import {
  Exercise,
  ExerciseFilterType,
  ExerciseStatus,
} from "../Utils/exercise-model";
import ExerciseList from "./ExercisesList";
import ExerciseFilter from "./ExerciseFilter";
import { ExerciseApi } from "../rest-api-client";
import ExerciseInput from "./ExerciseInput";
import "../App.css";
import { Optional } from "../Utils/shared-types";
import { useParams } from "react-router-dom";

function Exercises() {
  let { userId } = useParams();
  const [exercises, setExercises] = useState([] as Exercise[]);
  const [filter, setFilter] = useState(undefined as ExerciseFilterType);
  const [editedExercise, setEditedExercise] =
    useState<Optional<Exercise>>(undefined);

  useEffect(() => {
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
        <ExerciseInput
          key={editedExercise?.id}
          userId={Number(userId)}
          editExercise={editedExercise}
          onSubmitExercise={handleSubmitExercise}
        />
        <ExerciseFilter
          filter={filter}
          onFilterChange={(filter) => setFilter(filter)}
        />
        <ExerciseList
          exercises={exercises}
          userId={Number(userId)}
          filter={filter}
          onUpdateExercise={handleSubmitExercise}
          onDeleteExercise={handleDeleteExercise}
          onEditExercise={handleEditExercise}
        />
    </div>
  );
}

export default Exercises;
