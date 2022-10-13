import { useState, useEffect, useCallback } from "react";
import "../App.css";
import { UsersApi } from "../rest-api-client";
import {
  StatusFilterType,
  Optional,
  RoleFilterType,
} from "../Utils/shared-types";
import UserInput from "../UserNotLoggedComponent/UserRegisterAndEditInput";
import { User, UserRole } from "../Utils/users-model";
import UserStatusFilter from "./UserStatusFilter";
import UsersList from "./UsersList";
import UserRoleFilter from "./UserRoleFilter";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useParams } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { Box, Typography } from "@mui/material";

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
        await UsersApi.update(user);
        const updatedUsers = await UsersApi.findAll();
        setUsers(updatedUsers);
        setEditedUser(null);
      } else {
        await UsersApi.create(user);
        const updatedUsers = await UsersApi.findAll();
        setUsers(updatedUsers);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleEditUser = useCallback((user: User) => {
    setEditedUser(user);
  }, []);

  const handleUserDelete = useCallback(async (user: User) => {
    try {
      await UsersApi.deleteById(user.id);
      setUsers((users) => users.filter((u) => u.id !== user.id));
      if (loggedUser.id === user.id) {
        setLoggedUser(undefined);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="Container">
      {!loggedUser || editedUser ? (
        <UserInput
          key={editedUser?.id}
          loggedUser={loggedUser}
          editUser={editedUser}
          onSubmitUser={handleUserSubmit}
        />
      ) : null}
      {loggedUser ? (
        <>
          <Typography component="div">
            <Box
              sx={{ fontFamily: "Monospace", fontSize: "h6.fontSize", m: 1 }}
            >
              Currently logged in as: {loggedUser.userName}. Role:{" "}
              {UserRole[loggedUser.role]}
            </Box>
          </Typography>
          <Button
            sx={{
              marginTop: 2,
            }}
            component={Link}
            to={`/`}
            variant="contained"
            onClick={handleUserLogout}
            endIcon={<LogoutIcon />}
            type="button"
          >
            Logout
          </Button>
        </>
      ) : (
        <Button
          sx={{
            marginTop: 5,
          }}
          component={Link}
          to={`/login`}
          variant="contained"
          endIcon={<LoginIcon />}
          type="button"
        >
          Go to login
        </Button>
      )}

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
