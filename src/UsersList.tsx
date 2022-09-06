import React, { useMemo, useState } from "react";
import { Optional, RoleFilterType, UserListener } from "./shared-types";
import { User } from "./users-model";
import { StatusFilterType } from "./shared-types";
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
  const [firstLastNameFilter, setFirstLastNameFilter] = useState<string>("");
  const filteredUsers = useMemo(
    () =>
      users
        .filter((user) => (!statusFilter ? true : user.status === statusFilter))
        .filter((user) => (!roleFilter ? true : user.role === roleFilter))
        .filter((user) => user.userName.indexOf(userNameFilter) > -1)
        .filter(
          (user) =>
            user.firstName.indexOf(firstLastNameFilter) > -1 ||
            user.lastName.indexOf(firstLastNameFilter) > -1
        ),
    [users, statusFilter, roleFilter, userNameFilter, firstLastNameFilter]
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
          label="Search by first and last name"
          placeholder="Search by first and last name"
          value={firstLastNameFilter}
          onChange={(e) => {
            setFirstLastNameFilter(e.target.value);
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
