import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { UsersApi } from "./rest-api-client";
import { FilterType, Optional } from "./shared-types";
import { User, UserStatus } from "./users-model";
import UsersList from "./UsersList";

function UserAppFunction() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<FilterType>(undefined);
  const [errors, setErrors] = useState<Optional<string>>(undefined);
  const [editedUser, setEditedUser] = useState<Optional<User>>(undefined);

  useEffect(() => {
    UsersApi.findAll()
      .then((allUsers) => {
        setUsers(allUsers);
        setErrors(undefined);
      })
      .catch((err) => setErrors((err as any).toString()));
  }, []);

  const handleFilterChange = (filter: FilterType) => {
    setFilter(filter);
  }

  const handleEditUser = useCallback((user: User) => {
    setEditedUser(user);
  }, []);

  const handleUserDelete = useCallback(async (user: User) => {
    try {
      await UsersApi.deleteById(user.id);
      setUsers((users) => users.filter(u => u.id !== user.id));
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
        <UsersList
          users={users}
          filter={filter}
          onDeleteUser={handleUserDelete}
          onEditUser={handleEditUser}
        />
      </header>
    </div>
  );
}

export default UserAppFunction;
