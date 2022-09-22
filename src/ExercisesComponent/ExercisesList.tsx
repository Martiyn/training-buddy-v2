import { useMemo } from "react";
import { Exercise, ExerciseStatus } from "../Utils/exercise-model";
import { ExerciseFilterType, ExerciseListener } from "../Utils/exercise-model";
import ExerciseItem from "./ExerciseItem";

interface Props {
  exercises: Exercise[];
  filter: ExerciseFilterType;
  onUpdateExercise: ExerciseListener;
  onDeleteExercise: ExerciseListener;
  onEditExercise: ExerciseListener;
}

export default function ExerciseList({ exercises, filter, ...rest }: Props) {
  const visibleExercises = (
    exercises: Exercise[],
    filter: ExerciseFilterType
  ) =>
    exercises.filter((exercise) =>
      !filter ? true : exercise.status === filter
    );
  const memoizedVisibleExercises = useMemo(
    () => visibleExercises(exercises, filter),
    [exercises, filter]
  );
  return (
    <div className="TodoList">
      {memoizedVisibleExercises.map((exercise) => (
        <ExerciseItem exercise={exercise} key={exercise.id} {...rest} />
      ))}
    </div>
  );
}
