import React from "react";
import { Optional, UserListener } from "./shared-types";
import { User, UserGender, UserRole, UserStatus } from "./users-model";
import "./UserItem.css";

interface UserItemProps {
  user: User;
  loggedUser: Optional<User>;
  onDeleteUser: UserListener;
  onEditUser: UserListener;
}

export const UserItem = ({
  user,
  loggedUser,
  onDeleteUser,
  onEditUser,
}: UserItemProps) => {
  function handleEdit() {
    onEditUser(user);
  }
  function handleDelete() {
    onDeleteUser(user);
  }
  return (
    <div className="UserItem">
      <span className="UserItem-username">{user.userName}</span>
      <img className="UserItem-picture" src={user.picture}></img>
      <span className="UserItem-names">
        {user.firstName} {user.lastName}
      </span>
      <span className="UserItem-description">
        About me: {user.shortDescription}
      </span>
      <span className="UserItem-status">Status: {UserStatus[user.status]}</span>
      <span className="UserItem-gender">Gender: {UserGender[user.gender]}</span>
      <span className="UserItem-role">Role: {UserRole[user.role]}</span>
      <span className="UserItem-created-modified-on">
        <p>Created On: {user.registeredOn}</p>
        <p>Updated On: {user.modifiedOn}</p>
      </span>
      {loggedUser?.id === user.id || loggedUser?.role === UserRole.Admin ? (
        <div className="UserItem-btn-container">
          <span className="UserItem-button" onClick={handleDelete}>
            Delete
          </span>
          <span className="UserItem-button" onClick={handleEdit}>
            Edit
          </span>
        </div>
      ) : null}
    </div>
  );
};
