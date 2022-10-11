import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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
    <TableContainer sx={{ width: 650 }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Exercise</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Reps</TableCell>
            <TableCell align="right">Hold</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Complete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {memoizedVisibleExercises.map((exercise) => (
            <ExerciseItem exercise={exercise} key={exercise.id} {...rest} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
