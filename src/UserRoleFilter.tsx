import React from "react";
import { RoleFilterChangeListener, RoleFilterType } from "./shared-types";
import { UserRole, UserStatus } from "./users-model";
import "./UserRoleFilter.css";

interface UserRoleFilterProps {
  filter: RoleFilterType;
  onFilterChange: RoleFilterChangeListener;
}

export default function UserRoleFilter({
  filter,
  onFilterChange,
}: UserRoleFilterProps) {
  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onFilterChange(
      event.target.value === "0" ? undefined : parseInt(event.target.value)
    );
  }
  return (
    <div className="UserRoleFilter-container">
      <label htmlFor="filter">Filter by role: </label>
      <select
        value={filter}
        onChange={handleFilterChange}
        className="UserRoleFilter"
      >
        <option value="0">All</option>
        <option value={UserRole.User}>User</option>
        <option value={UserRole.Admin}>Admin</option>
      </select>
    </div>
  );
}
