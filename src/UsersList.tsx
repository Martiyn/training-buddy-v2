import React, { useMemo } from "react";
import { Optional, RoleFilterType, UserListener } from "./shared-types";
import { User } from "./users-model";
import { StatusFilterType } from "./shared-types";
import { UserItem } from "./UserItem";
import "./UsersList.css";

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
  const filteredUsers = useMemo(
    () =>
      users
        .filter((user) => (!statusFilter ? true : user.status === statusFilter))
        .filter((user) => (!roleFilter ? true : user.role === roleFilter)),
    [users, statusFilter, roleFilter]
  );
  return (
    <div className="UsersList">
      {filteredUsers.map((user) => (
        <UserItem user={user} key={user.id} {...rest} />
      ))}
    </div>
  );
}

export default React.memo(UsersList);
