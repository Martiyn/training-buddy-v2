import React from "react";
import { Exercise, ExerciseStatus } from "../Utils/exercise-model";
import { ExerciseListener } from "../Utils/exercise-model";

interface ExerciseItemProps {
  exercise: Exercise;
  onUpdateExercise: ExerciseListener;
  onDeleteExercise: ExerciseListener;
  onEditExercise: ExerciseListener;
}

const ExerciseItem = ({
  exercise,
  onUpdateExercise,
  onDeleteExercise,
  onEditExercise,
}: ExerciseItemProps) => {
  function handleCompletion(event: React.MouseEvent) {
    onUpdateExercise({ ...exercise, status: ExerciseStatus.Completed });
  }
  function handleDelete(event: React.MouseEvent) {
    onDeleteExercise(exercise);
  }
  return (
    <div className="TodoItem">
      <span className="TodoItem-text">{exercise.text}</span>
      <span className="TodoItem-right">
        <span className="TodoItem-status">
          {ExerciseStatus[exercise.status]}
        </span>
        {exercise.status === ExerciseStatus.Active ? (
          <button
            className="TodoItem-button fas fa-check-circle"
            onClick={handleCompletion}
          >
            Complete
          </button>
        ) : (
          <button onClick={handleDelete}>Delete</button>
        )}
        <button onClick={() => onEditExercise(exercise)}>Edit</button>
      </span>
    </div>
  );
};

export default ExerciseItem;
