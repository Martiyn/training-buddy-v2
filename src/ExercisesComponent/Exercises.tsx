import React, { useCallback, useEffect, useState } from "react";
import { Exercise, ExerciseStatus } from "../Utils/exercise-model";
import ExerciseList from "./ExercisesList";
import ExerciseFilter from "./ExerciseFilter";
import { ExerciseApi } from "../rest-api-client";
import ExerciseInput from "./ExerciseInput";
import "../App.css";
import { Optional } from "../Utils/shared-types";

export type FilterType = ExerciseStatus | undefined;

export interface TodoListener {
  (exercise: Exercise): void;
}

export interface FilterChangeListener {
  (filter: FilterType): void;
}

function Exercises() {
  const [exercises, setExercises] = useState([] as Exercise[]);
  const [filter, setFilter] = useState(undefined as FilterType);
  const [editedExercise, setEditedExercise] = useState<Optional<Exercise>>(undefined);

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
    <div className="App">
      <header className="App-header">
        <ExerciseInput key={editedExercise?.id} editExercise={editedExercise} onSubmitExercise={handleSubmitExercise} />
        <ExerciseFilter
          filter={filter}
          onFilterChange={(filter) => setFilter(filter)}
        />
        <ExerciseList
          exercises={exercises}
          filter={filter}
          onUpdateExercise={handleSubmitExercise}
          onDeleteExercise={handleDeleteExercise}
          onEditExercise={handleEditExercise}
        />
      </header>
    </div>
  );
}

export default Exercises;
