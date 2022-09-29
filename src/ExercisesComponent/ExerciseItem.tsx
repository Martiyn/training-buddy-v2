import { Card, IconButton, Typography } from "@mui/material";
import React from "react";
import { Exercise, ExerciseStatus } from "../Utils/exercise-model";
import { ExerciseListener } from "../Utils/exercise-model";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
    <Card
      sx={{
        height: 30,
        width: 700,
        backgroundColor: "#ddf",
        display: "flex",
        flexDirection: "row",
        alignItems: "space-between",
      }}
    >
      <Typography
        sx={{
          mx: 5,
        }}
        variant="body2"
        color="text.primary"
      >
        {exercise.text}
      </Typography>
      <Typography
        sx={{
          mx: 5,
        }}
        variant="body2"
        color="text.primary"
      >
        {ExerciseStatus[exercise.status]}
      </Typography>
      <IconButton onClick={() => onEditExercise(exercise)} aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Card>
    // <div className="TodoItem">
    //   <span className="TodoItem-text">{exercise.text}</span>
    //   <span className="TodoItem-right">
    //     <span className="TodoItem-status">
    //       {ExerciseStatus[exercise.status]}
    //     </span>
    //     {exercise.status === ExerciseStatus.Active ? (
    //       <button
    //         className="TodoItem-button fas fa-check-circle"
    //         onClick={handleCompletion}
    //       >
    //         Complete
    //       </button>
    //     ) : (
    //       <button onClick={handleDelete}>Delete</button>
    //     )}
    //     <button onClick={() => onEditExercise(exercise)}>Edit</button>
    //   </span>
    // </div>
  );
};

export default ExerciseItem;
