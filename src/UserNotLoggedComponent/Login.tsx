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
import { Link } from "react-router-dom";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import "../App.css";
import { Typography } from "@mui/material";
import { ExtendedUsersApi, AuthUser } from "../rest-api/user-rest-api";

function UserLogin() {
  const [loggedUser, setLoggedUser] = useState<Optional<User>>(undefined);

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

  async function handleUserLogin(
    data: FormData,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) {
    try {
      event?.preventDefault();
      const userToLogin = await ExtendedUsersApi.login(data as unknown as AuthUser);
      if (userToLogin.user && userToLogin.token) {
        localStorage.setItem("token", "Bearer " + userToLogin.token);
        setLoggedUser(userToLogin.user);
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
            <Button
              sx={{
                marginTop: 5,
              }}
              component={Link}
              to={`/`}
              variant="contained"
              endIcon={<ShortcutIcon />}
              type="button"
            >
              Go to users
            </Button>
          </Box>
        ) : (
          <>
            <Typography component="div">
              <Box
                sx={{ fontFamily: "Monospace", fontSize: "h6.fontSize", m: 1 }}
              >
                Successfully logged in as: {loggedUser.userName}
              </Box>
            </Typography>
            <Button
              component={Link}
              to={`/${loggedUser.id}`}
              variant="contained"
              endIcon={<LoginIcon />}
              type="button"
            >
              Go to training
            </Button>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default UserLogin;
