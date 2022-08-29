import React, { useState } from "react";
import { Optional, UserListener } from "./shared-types";
import { User, UserRole } from "./users-model";
import './UserLogin.css'

interface UserLoginProps {
  loggedUser: Optional<User>;
  users: User[];
  onLoginUser: UserListener;
}

function UserLogin({ loggedUser, users, onLoginUser }: UserLoginProps) {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  function handleUserLogin(event: React.FormEvent) {
    try {
      event.preventDefault();
      const userToLogin = users.filter(
        (user) => user.userName === userName && user.password === password
      );
      onLoginUser(userToLogin[0]);
      alert(`Welcome ${userToLogin[0].userName} role: ${userToLogin[0].role}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="UserLogin">
      {!loggedUser ? (
        <form className="UserLogin-form" onSubmit={handleUserLogin}>
          <label htmlFor="loginUserName"> User Name: </label>
          <input
            type="text"
            id="loginUserName"
            name="loginUserName"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            required
          />

          <label htmlFor="loginPassword"> Password: </label>
          <input
            type="password"
            id="loginPassword"
            name="loginPassword"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button className="UserLogin-submit-btn" type="submit">
            Login
          </button>
        </form>
      ) : (
        <span>Currently logged in: {loggedUser.userName} role: {UserRole[loggedUser.role]}</span>
      )}
    </div>
  );
}

export default UserLogin;
