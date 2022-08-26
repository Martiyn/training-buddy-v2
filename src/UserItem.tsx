import React from "react";
import { UserListener } from "./shared-types";
import { User, UserGender, UserStatus } from "./users-model";
import "./UserItem.css";

interface UserItemProps {
  user: User;
  onDeleteUser: UserListener;
  onEditUser: UserListener;
}

export const UserItem = ({ user, onDeleteUser, onEditUser }: UserItemProps) => {
  function handleEdit() {
    onEditUser(user);
  }
  function handleDelete() {
    onDeleteUser(user);
  }
  return (
    <div className="UserItem">
      <span className="UserItem-username">{user.userName}</span>
      <span className="UserItem-picture">{user.picture}</span>
      <span className="UserItem-names">
        {user.firstName} {user.lastName}
      </span>
      <span className="UserItem-description">
        About me: {user.shortDescription}
      </span>
      <span className="UserItem-status">Status: {UserStatus[user.status]}</span>
      <span className="UserItem-gender">Gender: {UserGender[user.gender]}</span>
      <span className="UserItem-created-modified-on">
        Created On: {user.registeredOn.toISOString()}
        Updated On: {user.modifiedOn.toISOString()}
      </span>
    </div>
  );
};
