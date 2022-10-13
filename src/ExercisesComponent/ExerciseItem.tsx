import { IconButton, TableCell, TableRow } from "@mui/material";
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
import { IdType, Optional } from "../Utils/shared-types";
import { User, UserRole } from "../Utils/users-model";

interface ExerciseItemProps {
  exercise: Exercise;
  loggedUser: Optional<User>;
  userId: IdType;
  onUpdateExercise: ExerciseListener;
  onDeleteExercise: ExerciseListener;
  onEditExercise: ExerciseListener;
}

const ExerciseItem = ({
  exercise,
  loggedUser,
  userId,
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
        <IconButton
          disabled={
            loggedUser?.id === userId ||
            loggedUser?.role === UserRole.Instructor
              ? false
              : true
          }
          onClick={() => onEditExercise(exercise)}
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell align="right">
        {exercise.status === ExerciseStatus.Active ? (
          <IconButton
            disabled={loggedUser?.id !== userId ? true : false}
            onClick={handleCompletion}
            aria-label="delete"
          >
            <CheckIcon />
          </IconButton>
        ) : (
          <IconButton
            disabled={loggedUser?.id !== userId ? true : false}
            onClick={handleDelete}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ExerciseItem;
