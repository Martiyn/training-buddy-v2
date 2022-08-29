import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { UsersApi } from "./rest-api-client";
import { StatusFilterType, Optional, RoleFilterType } from "./shared-types";
import UserInput from "./UserInput";
import UserLogin from "./UserLogin";
import { User, UserStatus } from "./users-model";
import UserStatusFilter from "./UserStatusFilter";
import UsersList from "./UsersList";
import UserRoleFilter from "./UserRoleFilter";

function UserAppFunction() {
  const [users, setUsers] = useState<User[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>(undefined);
  const [roleFilter, setRoleFilter] = useState<RoleFilterType>(undefined);
  const [errors, setErrors] = useState<Optional<string>>(undefined);
  const [editedUser, setEditedUser] = useState<Optional<User>>(undefined);
  const [loggedUser, setLoggedUser] = useState<Optional<User>>(undefined);

  useEffect(() => {
    UsersApi.findAll()
      .then((allUsers) => {
        setUsers(allUsers);
        setErrors(undefined);
      })
      .catch((err) => setErrors((err as any).toString()));
  }, []);

  const handleStatusFilterChange = (statusFilter: StatusFilterType) => {
    setStatusFilter(statusFilter);
  };

  const handleRoleFilterChange = (roleFilter: RoleFilterType) => {
    setRoleFilter(roleFilter);
  };

  const handleUserLogin = useCallback(async (user: User) => {
    setLoggedUser(user);
  }, []);

  const handleUserLogout = useCallback(() => {
    setLoggedUser(undefined);
  }, []);

  const handleUserSubmit = useCallback(async (user: User) => {
    try {
      if (user.id) {
        const updated = await UsersApi.update(user);
        setUsers((users) =>
          users.map((u) => (u.id === updated.id ? updated : u))
        );
        setErrors(undefined);
      } else {
        const created = await UsersApi.create(user);
        setUsers((users) => users.concat(created));
        setErrors(undefined);
      }
    } catch (err) {
      setErrors((err as any).toString());
    }
  }, []);

  const handleEditUser = useCallback((user: User) => {
    setEditedUser(user);
  }, []);

  const handleUserDelete = useCallback(async (user: User) => {
    try {
      await UsersApi.deleteById(user.id);
      setUsers((users) => users.filter((u) => u.id !== user.id));
      setErrors(undefined);
    } catch (err) {
      setErrors((err as any).toString());
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>React Users homework</h2>
        {errors && <div className="errors">{errors}</div>}
        <UserLogin
          loggedUser={loggedUser}
          users={users}
          onLoginUser={handleUserLogin}
        />
        {loggedUser ? (
          <button
            className="UserLogoutBtn"
            onClick={handleUserLogout}
            type="button"
          >
            Logout
          </button>
        ) : null}

        <UserInput
          key={editedUser?.id}
          loggedUser={loggedUser}
          editUser={editedUser}
          onSubmitUser={handleUserSubmit}
        />

        <UserStatusFilter
          filter={statusFilter}
          onFilterChange={handleStatusFilterChange}
        />

        <UserRoleFilter
          filter={roleFilter}
          onFilterChange={handleRoleFilterChange}
        />

        <UsersList
          users={users}
          statusFilter={statusFilter}
          roleFilter={roleFilter}
          loggedUser={loggedUser}
          onDeleteUser={handleUserDelete}
          onEditUser={handleEditUser}
        />
      </header>
    </div>
  );
}

export default UserAppFunction;