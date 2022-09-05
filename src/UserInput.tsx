import { useState } from "react";
import { Optional, UserListener } from "./shared-types";
import {
  toIsoDate,
  User,
  UserGender,
  UserRole,
  UserStatus,
} from "./users-model";
import "./UserInput.css";
import React from "react";

interface UserInputProps {
  loggedUser: Optional<User>;
  editUser: Optional<User>;
  onSubmitUser: UserListener;
}

function UserInput({ editUser, loggedUser, onSubmitUser }: UserInputProps) {
  const [id, setId] = useState<string>(editUser?.id?.toString() || "");
  const [firstName, setFirstName] = useState<string>(editUser?.firstName || "");
  const [lastName, setLastName] = useState<string>(editUser?.lastName || "");
  const [userName, setUserName] = useState<string>(editUser?.userName || "");
  const [picture, setPicture] = useState<string>(editUser?.picture || "");
  const [password, setPassword] = useState<string>(editUser?.password || "");
  const [role, setRole] = useState<string>(editUser?.role.toString() || "1");
  const [status, setStatus] = useState<string>(
    editUser?.status.toString() || "1"
  );
  const [shortDescription, setShortDescription] = useState<string>(
    editUser?.shortDescription || ""
  );
  const [gender, setGender] = useState<string>(
    editUser?.gender.toString() || "1"
  );

  const handleUserSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmitUser(
      new User(
        id ? parseInt(id) : undefined,
        firstName,
        lastName,
        userName,
        password,
        parseInt(gender),
        parseInt(role),
        picture,
        shortDescription,
        parseInt(status),
        editUser?.registeredOn ? editUser.registeredOn : toIsoDate(new Date()),
        toIsoDate(new Date())
      )
    );
    setId("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setUserName("");
    setShortDescription("");
    setGender("1");
    setStatus("1");
    setRole("1");
    setPicture("");
  };

  return (
    <form className="UserInput" onSubmit={handleUserSubmit}>
      <div className="UserInput-container">
        <div className="UserInput-left-side">
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" value={id} disabled />

          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />

          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            disabled={
              loggedUser?.id !== editUser?.id &&
              loggedUser?.role === UserRole.Admin
                ? true
                : false
            }
          />
        </div>

        <div className="UserInput-right-side">
          <label htmlFor="picture">Picture URL</label>
          <input
            type="text"
            id="picture"
            name="picture"
            value={picture}
            onChange={(e) => {
              setPicture(e.target.value);
            }}
            required
          />

          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            required
          >
            <option value={UserStatus.Active}>Active</option>
            <option value={UserStatus.Suspended}>Suspended</option>
            <option value={UserStatus.Deactivated}>Deactivated</option>
          </select>

          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
            required
          >
            <option value={UserGender.Male}>Male</option>
            <option value={UserGender.Female}>Female</option>
          </select>

          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
            required
          >
            <option value={UserRole.User}>User</option>
            <option value={UserRole.Admin}>Admin</option>
          </select>

          <label htmlFor="shortDescription">Short Description</label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={shortDescription}
            onChange={(e) => {
              setShortDescription(e.target.value);
            }}
            required
          />
        </div>
      </div>
      <button className="UserInput-submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
}

export default UserInput;
