import React, { useMemo, useState } from "react";
import { Optional, RoleFilterType, UserListener } from "../Utils/shared-types";
import { User } from "../Utils/users-model";
import { StatusFilterType } from "../Utils/shared-types";
import { UserItem } from "./UserItem";
import "./UsersList.css";
import TextField from "@mui/material/TextField";

interface UsersListProps {
  users: User[];
  statusFilter: StatusFilterType;
  roleFilter: RoleFilterType;
  loggedUser: Optional<User>;
  onDeleteUser: UserListener;
  onEditUser: UserListener;
}

function UsersList({
  users,
  statusFilter,
  roleFilter,
  ...rest
}: UsersListProps) {
  const [userNameFilter, setUserNameFilter] = useState<string>("");
  const [firstNameFilter, setFirstNameFilter] = useState<string>("");
  const [lastNameFilter, setLastNameFilter] = useState<string>("");
  const filteredUsers = useMemo(
    () =>
      users
        .filter((user) => (!statusFilter ? true : user.status === statusFilter))
        .filter((user) => (!roleFilter ? true : user.role === roleFilter))
        .filter(
          (user) =>
            user.userName.toLowerCase().indexOf(userNameFilter.toLowerCase()) >
            -1
        )
        .filter(
          (user) =>
            user.firstName
              .toLowerCase()
              .indexOf(firstNameFilter.toLowerCase()) > -1
        )
        .filter(
          (user) =>
            user.lastName.toLowerCase().indexOf(lastNameFilter.toLowerCase()) >
            -1
        ),
    [
      users,
      statusFilter,
      roleFilter,
      userNameFilter,
      firstNameFilter,
      lastNameFilter,
    ]
  );
  return (
    <React.Fragment>
      <div className="UsersList-search-fields">
        <TextField
          sx={{
            backgroundColor: "#3c414c",
          }}
          label="Search by username"
          placeholder="Search by username"
          value={userNameFilter}
          onChange={(e) => {
            setUserNameFilter(e.target.value);
          }}
        />
        <TextField
          sx={{
            backgroundColor: "#3c414c",
          }}
          label="Search by first name"
          placeholder="Search by first name"
          value={firstNameFilter}
          onChange={(e) => {
            setFirstNameFilter(e.target.value);
          }}
        />
        <TextField
          sx={{
            backgroundColor: "#3c414c",
          }}
          label="Search by last name"
          placeholder="Search by last name"
          value={lastNameFilter}
          onChange={(e) => {
            setLastNameFilter(e.target.value);
          }}
        />
      </div>
      <div className="UsersList">
        {filteredUsers.map((user) => (
          <UserItem user={user} key={user.id} {...rest} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default React.memo(UsersList);
