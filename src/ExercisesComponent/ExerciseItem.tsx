import {
  Card,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Exercise,
  ExerciseStatus,
  ExerciseType,
} from "../Utils/exercise-model";
import { ExerciseListener } from "../Utils/exercise-model";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

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
    <TableRow
      key={exercise.text}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {exercise.text}
      </TableCell>
      <TableCell align="right">{ExerciseStatus[exercise.status]}</TableCell>
      <TableCell align="right">{ExerciseType[exercise.type]}</TableCell>
      <TableCell align="right">{exercise.reps}</TableCell>
      <TableCell align="right">{exercise.hold} sec.</TableCell>
      <TableCell align="right">
        <IconButton onClick={() => onEditExercise(exercise)} aria-label="edit">
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell align="right">
        {exercise.status === ExerciseStatus.Active ? (
          <IconButton onClick={handleCompletion} aria-label="delete">
            <CheckIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
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
