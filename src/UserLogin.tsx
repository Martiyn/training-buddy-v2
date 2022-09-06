import React, { BaseSyntheticEvent, useState } from "react";
import { Optional, UserListener } from "./shared-types";
import { User, UserRole } from "./users-model";
import "./UserLogin.css";
import * as yup from "yup";
import InputText from "./InputText";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface UserLoginProps {
  loggedUser: Optional<User>;
  users: User[];
  onLoginUser: UserListener;
}

function UserLogin({ loggedUser, users, onLoginUser }: UserLoginProps) {
  const schema = yup
    .object({
      userName: yup.string().required().min(2).max(15),
      password: yup.string().required().min(5).max(15),
    })
    .required();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  type FormData = {
    userName: string;
    password: string;
  };

  function handleUserLogin(
    data: FormData,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) {
    try {
      event?.preventDefault();
      const userToLogin = users.filter(
        (user) =>
          user.userName === data.userName && user.password === data.password
      );
      onLoginUser(userToLogin[0]);
      setValue("userName", "");
      setValue("password", "");
      alert(
        `Welcome ${userToLogin[0].userName} role: ${
          UserRole[userToLogin[0].role]
        }`
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <React.Fragment>
      {!loggedUser ? (
        <Box
          component="form"
          sx={{
            backgroundColor: "#ddf",
            padding: "20px",
            "& .MuiTextField-root": { m: 1, width: "calc(100% - 20px)" },
            "& .MuiButton-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleUserLogin)}
        >
          <InputText
            name="userName"
            label="User Name"
            control={control}
            error={errors.userName?.message}
            rules={{ required: true, minLength: 2, maxLength: 15 }}
          />
          <InputText
            name="password"
            label="Password"
            control={control}
            error={errors.password?.message}
            rules={{ required: true, minLength: 5, maxLength: 15 }}
          />
          <Button variant="contained" endIcon={<LoginIcon />} type="submit">
            Login
          </Button>
        </Box>
      ) : (
        <span>
          Currently logged in: {loggedUser.userName} role:{" "}
          {UserRole[loggedUser.role]}
        </span>
      )}
    </React.Fragment>
  );
}

export default UserLogin;
