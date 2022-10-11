import React, { BaseSyntheticEvent, useState } from "react";
import { Optional } from "../Utils/shared-types";
import { User } from "../Utils/users-model";
import * as yup from "yup";
import InputText from "../InputTemplates/InputText";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLoaderData } from "react-router-dom";
import "../App.css";

function UserLogin() {
  const [loggedUser, setLoggedUser] = useState<Optional<User>>(undefined);
  const users = useLoaderData() as User[];

  const schema = yup
    .object({
      userName: yup.string().required(),
      password: yup.string().required(),
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
      if (userToLogin.length > 0) {
        setLoggedUser(userToLogin[0]);
      } else {
        alert("Please check your username and password and try again.");
      }
      setValue("userName", "");
      setValue("password", "");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <React.Fragment>
      <div className="Container">
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
              rules={{ required: true }}
            />
            <InputText
              name="password"
              label="Password"
              control={control}
              error={errors.password?.message}
              rules={{ required: true }}
            />
            <Button variant="contained" endIcon={<LoginIcon />} type="submit">
              Login
            </Button>
          </Box>
        ) : (
          <Button
            component={Link}
            to={`/${loggedUser.id}`}
            variant="contained"
            endIcon={<LoginIcon />}
            type="button"
          >
            Go to training
          </Button>
        )}
      </div>
    </React.Fragment>
  );
}

export default UserLogin;
