import React from "react";
import { StatusFilterChangeListener, StatusFilterType } from "./shared-types";
import { UserStatus } from "./users-model";
import "./UserStatusFilter.css";

interface UserFilterProps {
  filter: StatusFilterType;
  onFilterChange: StatusFilterChangeListener;
}

export default function UserStatusFilter({
  filter,
  onFilterChange,
}: UserFilterProps) {
  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onFilterChange(
      event.target.value === "0" ? undefined : parseInt(event.target.value)
    );
  }
  return (
    <div className="UserStatusFilter-container">
      <label htmlFor="filter">Filter by status: </label>
      <select
        value={filter}
        onChange={handleFilterChange}
        className="UserStatusFilter"
      >
        <option value="0">All</option>
        <option value={UserStatus.Active}>Active</option>
        <option value={UserStatus.Suspended}>Suspended</option>
        <option value={UserStatus.Deactivated}>Deactivated</option>
      </select>
    </div>
  );
}
