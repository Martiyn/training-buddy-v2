import React, { useState } from "react";
import { Optional, UserListener } from "./shared-types";
import { User } from "./users-model";
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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="UserLogin">
      {!loggedUser ? (
        <form className="UserLogin-form" onSubmit={handleUserLogin}>
          <label htmlFor="userName">User Name: </label>
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

          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
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
        <span>Currently logged in: {loggedUser.userName}</span>
      )}
    </div>
  );
}

export default UserLogin;
