import { Stack } from "@mui/material";
import { useMemo } from "react";
import { Exercise, ExerciseStatus } from "../Utils/exercise-model";
import { ExerciseFilterType, ExerciseListener } from "../Utils/exercise-model";
import { IdType } from "../Utils/shared-types";
import ExerciseItem from "./ExerciseItem";

interface ExerciseListProps {
  exercises: Exercise[];
  userId: IdType;
  filter: ExerciseFilterType;
  onUpdateExercise: ExerciseListener;
  onDeleteExercise: ExerciseListener;
  onEditExercise: ExerciseListener;
}

export default function ExerciseList({
  userId,
  exercises,
  filter,
  ...rest
}: ExerciseListProps) {
  const visibleExercises = (
    exercises: Exercise[],
    filter: ExerciseFilterType
  ) =>
    exercises
      .filter((exercise) => (!filter ? true : exercise.status === filter))
      .filter((exercise) => exercise.userId === userId);
  const memoizedVisibleExercises = useMemo(
    () => visibleExercises(exercises, filter),
    [exercises, filter]
  );
  return (
    <Stack spacing={2}>
      {memoizedVisibleExercises.map((exercise) => (
        <ExerciseItem exercise={exercise} key={exercise.id} {...rest} />
      ))}
    </Stack>
  );
}
