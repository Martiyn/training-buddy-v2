import React from "react";
import { RoleFilterChangeListener, RoleFilterType } from "./shared-types";
import { UserRole, UserStatus } from "./users-model";
import "./UserRoleFilter.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
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
        ? undefined
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
        <MenuItem value={UserRole.User}>User</MenuItem>
        <MenuItem value={UserRole.Admin}>Admin</MenuItem>
      </Select>
    </React.Fragment>
  );
}
