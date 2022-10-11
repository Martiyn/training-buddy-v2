import { useState, useEffect, useCallback } from "react";
import "../App.css";
import { UsersApi } from "../rest-api-client";
import {
  StatusFilterType,
  Optional,
  RoleFilterType,
} from "../Utils/shared-types";
import UserInput from "../UserNotLoggedComponent/UserRegisterAndEditInput";
import { User } from "../Utils/users-model";
import UserStatusFilter from "./UserStatusFilter";
import UsersList from "./UsersList";
import UserRoleFilter from "./UserRoleFilter";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useParams } from "react-router-dom";

function Users() {
  let { userId } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>(0);
  const [roleFilter, setRoleFilter] = useState<RoleFilterType>(0);
  const [editedUser, setEditedUser] = useState<Optional<User>>(undefined);
  const [loggedUser, setLoggedUser] = useState<Optional<User>>(undefined);

  useEffect(() => {
    if (userId) {
      UsersApi.findById(userId).then((loggedUser) => {
        setLoggedUser(loggedUser);
      });
    }
    UsersApi.findAll()
      .then((allUsers) => {
        setUsers(allUsers);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleStatusFilterChange = (statusFilter: StatusFilterType) => {
    setStatusFilter(statusFilter);
  };

  const handleRoleFilterChange = (roleFilter: RoleFilterType) => {
    setRoleFilter(roleFilter);
  };

  const handleUserLogout = useCallback(() => {
    setLoggedUser(null);
  }, []);

  const handleUserSubmit = useCallback(async (user: User) => {
    try {
      if (user.id) {
        const updated = await UsersApi.update(user);
        setUsers((users) =>
          users.map((u) => (u.id === updated.id ? updated : u))
        );
      } else {
        const created = await UsersApi.create(user);
        setUsers((users) => users.concat(created));
      }
    } catch (err) {
      console.log(err);
    }
  }, [users]);

  const handleEditUser = useCallback((user: User) => {
    setEditedUser(user);
  }, []);

  const handleUserDelete = useCallback(async (user: User) => {
    try {
      await UsersApi.deleteById(user.id);
      setUsers((users) => users.filter((u) => u.id !== user.id));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="Container">
      {loggedUser ? (
        <Button
          component={Link}
          to={`/`}
          variant="contained"
          onClick={handleUserLogout}
          endIcon={<LogoutIcon />}
          type="button"
        >
          Logout
        </Button>
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
    </div>
  );
}

export default Users;
