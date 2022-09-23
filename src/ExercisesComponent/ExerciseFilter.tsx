import React from "react";
import { ExerciseStatus } from "../Utils/exercise-model";
import { ExerciseFilterChangeListener, ExerciseFilterType } from "../Utils/exercise-model";

interface TodoFilterProps {
    filter: ExerciseFilterType;
    onFilterChange: ExerciseFilterChangeListener;
}

export default function TodoFilter({filter, onFilterChange}: TodoFilterProps) {
    function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChange(event.target.value === '0'? undefined: parseInt(event.target.value))
    }
    return (
        <select value={filter} onChange={handleFilterChange} className="TodoFilter">
            <option value='0'>All</option>
            <option value={ExerciseStatus.Active}>Active</option>
            <option value={ExerciseStatus.Completed}>Completed</option>
        </select>

    );
}