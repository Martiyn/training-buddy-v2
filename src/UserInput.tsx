import { SetStateAction, useState } from "react";
import { Optional, UserListener } from "./shared-types";
import { User, UserGender, UserRole, UserStatus } from "./users-model";
import "./UserInput.css";
import React from "react";

interface UserInputProps {
  user: Optional<User>;
  onSubmitUser: UserListener;
}

interface UserInputState {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  picture: string;
  password: string;
  role: string;
  status: string;
  shortDescription: string;
  gender: string;
}

class UserInput extends React.Component<UserInputProps, UserInputState> {
  state: Readonly<UserInputState> = {
    id: this.props.user?.id?.toString() || "",
    firstName: this.props.user?.firstName || "",
    lastName: this.props.user?.lastName || "",
    userName: this.props.user?.userName || "",
    picture: this.props.user?.picture || "",
    password: this.props.user?.password || "",
    role: this.props.user?.role.toString() || "1",
    status: this.props.user?.status.toString() || "1",
    shortDescription: this.props.user?.shortDescription || "",
    gender: this.props.user?.gender.toString() || "1",
  };

  handleFieldChanged = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const fieldName = event.target.name;
    this.setState({
      [fieldName]: event.target.value,
    } as unknown as UserInputState);
  };

  handleUserSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onSubmitUser(
      new User(
        this.state.id ? parseInt(this.state.id) : undefined,
        this.state.firstName,
        this.state.lastName,
        this.state.userName,
        this.state.password,
        parseInt(this.state.gender),
        parseInt(this.state.role),
        this.state.picture,
        this.state.shortDescription,
        parseInt(this.state.status)
      )
    );
    this.setState({
      id: "",
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      gender: "1",
      role: "1",
      picture: "",
      shortDescription: "",
      status: "1",
    });
  };

  render() {
    return (
      <form className="UserInput" onSubmit={this.handleUserSubmit}>
        <div className="UserInput-container">
          <div className="UserInput-left-side">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              name="id"
              defaultValue={this.state.id}
              disabled
            />

            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleFieldChanged}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleFieldChanged}
            />

            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={this.state.userName}
              onChange={this.handleFieldChanged}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldChanged}
            />
          </div>

          <div className="UserInput-right-side">
            <label htmlFor="picture">Picture URL</label>
            <input
              type="text"
              id="picture"
              name="picture"
              value={this.state.picture}
              onChange={this.handleFieldChanged}
            />

            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={this.state.status}
              onChange={this.handleFieldChanged}
            >
              <option value={UserStatus.Active}>Active</option>
              <option value={UserStatus.Suspended}>Suspended</option>
              <option value={UserStatus.Deactivated}>Deactivated</option>
            </select>

            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={this.state.gender}
              onChange={this.handleFieldChanged}
            >
              <option value={UserGender.Male}>Male</option>
              <option value={UserGender.Female}>Female</option>
            </select>

            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={this.state.role}
              onChange={this.handleFieldChanged}
            >
              <option value={UserRole.User}>User</option>
              <option value={UserRole.Admin}>Admin</option>
            </select>

            <label htmlFor="shortDescription">Short Description</label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              value={this.state.shortDescription}
              onChange={this.handleFieldChanged}
            />
          </div>
        </div>
        <button className="UserInput-submit-btn" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default UserInput;
