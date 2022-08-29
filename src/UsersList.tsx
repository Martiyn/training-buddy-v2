import React, { useMemo } from "react";
import { Optional, UserListener } from "./shared-types";
import { User } from "./users-model";
import { FilterType } from "./shared-types";
import { UserItem } from "./UserItem";
import './UsersList.css'

interface UsersListProps {
  users: User[];
  filter: FilterType;
  loggedUser: Optional<User>;
  onDeleteUser: UserListener;
  onEditUser: UserListener;
}

function UsersList({ users, filter, ...rest }: UsersListProps) {
  const filteredUsers = useMemo(
    () => users.filter((user) => (!filter ? true : user.status === filter)),
    [users, filter]
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
