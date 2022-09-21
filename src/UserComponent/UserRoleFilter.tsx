import React from "react";
import { RoleFilterChangeListener, RoleFilterType } from "../Utils/shared-types";
import { UserRole } from "../Utils/users-model";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

interface UserRoleFilterProps {
  filter: RoleFilterType;
  onFilterChange: RoleFilterChangeListener;
}

export default function UserRoleFilter({
  filter,
  onFilterChange,
}: UserRoleFilterProps) {
  function handleFilterChange(event: SelectChangeEvent<UserRole>) {
    onFilterChange(
      event.target.value === "0"
        ? parseInt("0")
        : parseInt(event.target.value.toString())
    );
  }
  return (
    <React.Fragment>
      <InputLabel
        id="Role-label"
        sx={{
          color: "white",
          padding: "5px",
        }}
      >
        Filter By Role:
      </InputLabel>
      <Select
        sx={{
          backgroundColor: "#dcf",
        }}
        name="role"
        value={filter}
        defaultValue={0}
        labelId="Role-label"
        label="Role"
        onChange={handleFilterChange}
      >
        <MenuItem value="0">All</MenuItem>
        <MenuItem value={UserRole.Trainee}>Trainee</MenuItem>
        <MenuItem value={UserRole.Instructor}>Instructor</MenuItem>
        <MenuItem value={UserRole.Admin}>Admin</MenuItem>
      </Select>
    </React.Fragment>
  );
}
