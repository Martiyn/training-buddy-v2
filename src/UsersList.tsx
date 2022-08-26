import React, { useMemo } from "react";
import { UserListener } from "./shared-types";
import { User, UserStatus } from "./users-model";
import { FilterType } from "./shared-types";
import { UserItem } from "./UserItem";

interface UsersListProps {
  users: User[];
  filter: FilterType;
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
