import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { StatusFilterChangeListener, StatusFilterType } from "./shared-types";
import { UserStatus } from "./users-model";

interface UserFilterProps {
  filter: StatusFilterType;
  onFilterChange: StatusFilterChangeListener;
}

export default function UserStatusFilter({
  filter,
  onFilterChange,
}: UserFilterProps) {
  function handleFilterChange(event: SelectChangeEvent<UserStatus>) {
    onFilterChange(
      event.target.value === "0"
        ? parseInt("0")
        : parseInt(event.target.value.toString())
    );
  }
  return (
    <React.Fragment>
      <InputLabel
        id="Status-label"
        sx={{
          color: "white",
          padding: "5px",
        }}
      >
        Filter By Status:
      </InputLabel>
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
        <MenuItem value={UserStatus.Active}>Active</MenuItem>
        <MenuItem value={UserStatus.Suspended}>Suspended</MenuItem>
        <MenuItem value={UserStatus.Deactivated}>Deactivated</MenuItem>
      </Select>
    </React.Fragment>
  );
}
