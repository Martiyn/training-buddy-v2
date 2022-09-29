import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { ExerciseStatus } from "../Utils/exercise-model";
import {
  ExerciseFilterChangeListener,
  ExerciseFilterType,
} from "../Utils/exercise-model";

interface TodoFilterProps {
  filter: ExerciseFilterType;
  onFilterChange: ExerciseFilterChangeListener;
}

export default function TodoFilter({
  filter,
  onFilterChange,
}: TodoFilterProps) {
  function handleFilterChange(event: SelectChangeEvent<ExerciseStatus>) {
    onFilterChange(
      event.target.value === "0"
        ? parseInt("0")
        : parseInt(event.target.value.toString())
    );
  }
  return (
    <Select
      name="status"
      value={filter}
      defaultValue={0}
      sx={{
        backgroundColor: "#dcf",
      }}
      labelId="Status-label"
      label="Status"
      onChange={handleFilterChange}
      required
    >
      <MenuItem value="0">All</MenuItem>
      <MenuItem value={ExerciseStatus.Active}>Active</MenuItem>
      <MenuItem value={ExerciseStatus.Completed}>Completed</MenuItem>
    </Select>
  );
}
