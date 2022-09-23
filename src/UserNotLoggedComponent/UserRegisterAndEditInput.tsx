import { useState } from "react";
import { IdType, Optional, UserListener } from "../Utils/shared-types";
import {
  toIsoDate,
  User,
  UserGender,
  UserRole,
  UserStatus,
} from "../Utils/users-model";
import React, { BaseSyntheticEvent } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputText from "./InputText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./UserInput.css";

var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

interface UserInputProps {
  loggedUser: Optional<User>;
  editUser: Optional<User>;
  onSubmitUser: UserListener;
}

type FormData = {
  id: IdType;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  gender: UserGender;
  role: UserRole;
  picture: string;
  shortDescription: string;
  status: UserStatus;
};

const schema = yup
  .object({
    id: yup.number().positive(),
    firstName: yup.string().required().min(2).max(15),
    lastName: yup.string().required().min(2).max(15),
    userName: yup.string().required().min(5).max(15),
    password: yup
      .string()
      .required()
      .min(8)
      .matches(
        passwordRegex,
        "password must contain at least one number and one special character"
      ),
    picture: yup.string().required().url(),
    shortDescription: yup.string().required().max(75),
  })
  .required();

function UserInput({ editUser, loggedUser, onSubmitUser }: UserInputProps) {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { ...editUser },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [role, setRole] = useState<string>(editUser?.role.toString() || "1");
  const [status, setStatus] = useState<string>(
    editUser?.status.toString() || "1"
  );
  const [gender, setGender] = useState<string>(
    editUser?.gender.toString() || "1"
  );

  const handleUserSubmit = (
    data: FormData,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    onSubmitUser(
      new User(
        data.id ? data.id : undefined,
        data.firstName,
        data.lastName,
        data.userName,
        data.password,
        parseInt(gender),
        parseInt(role),
        data.picture,
        data.shortDescription,
        parseInt(status),
        editUser?.registeredOn ? editUser.registeredOn : toIsoDate(new Date()),
        toIsoDate(new Date())
      )
    );
    setValue("id", "");
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("userName", "");
    setValue("picture", "");
    setValue("password", "");
    setValue("shortDescription", "");
    setGender("1");
    setStatus("1");
    setRole("1");
  };

  return (
    <React.Fragment>
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
        onSubmit={handleSubmit(handleUserSubmit)}
      >
        <InputText
          name="id"
          label="ID"
          control={control}
          disabled
          size="small"
        />
        <InputText
          name="firstName"
          label="First Name"
          control={control}
          error={errors.firstName?.message}
          rules={{ required: true, minLength: 2, maxLength: 15 }}
        />
        <InputText
          name="lastName"
          label="Last Name"
          control={control}
          error={errors.lastName?.message}
          rules={{ required: true, minLength: 2, maxLength: 15 }}
        />
        <InputText
          name="userName"
          label="User Name"
          control={control}
          disabled={editUser ? true : false}
          error={errors.userName?.message}
          rules={{ required: true, minLength: 5, maxLength: 15 }}
        />
        <InputText
          name="picture"
          label="Picture"
          control={control}
          error={errors.picture?.message}
          rules={{ required: true }}
        />
        <InputText
          name="password"
          label="Password"
          control={control}
          error={errors.password?.message}
          disabled={
            loggedUser?.id !== editUser?.id &&
            loggedUser?.role === UserRole.Admin
              ? true
              : false
          }
          rules={{ required: true, minLength: 8 }}
        />
        <InputText
          name="shortDescription"
          label="short Description"
          control={control}
          error={errors.shortDescription?.message}
          rules={{ required: true, maxLength: 512 }}
        />

        <label htmlFor="status" color="primary">
          Status:{" "}
        </label>
        <Select
          sx={{
            backgroundColor: "#118bee",
          }}
          name="status"
          value={status}
          label="Status"
          disabled={
            editUser && loggedUser?.role === UserRole.Trainee ? true : false
          }
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          required
        >
          <MenuItem value={UserStatus.Active}>Active</MenuItem>
          <MenuItem value={UserStatus.Suspended}>Suspended</MenuItem>
          <MenuItem value={UserStatus.Deactivated}>Deactivated</MenuItem>
        </Select>

        <label htmlFor="gender" color="primary">
          Gender:{" "}
        </label>
        <Select
          sx={{
            backgroundColor: "#118bee",
          }}
          name="gender"
          value={gender}
          label="Gender"
          onChange={(e) => {
            setGender(e.target.value);
          }}
          required
        >
          <MenuItem value={UserGender.Male}>Male</MenuItem>
          <MenuItem value={UserGender.Female}>Female</MenuItem>
        </Select>

        <label htmlFor="role">Role: </label>
        <Select
          sx={{
            backgroundColor: "#118bee",
          }}
          name="role"
          value={role}
          label="Role"
          onChange={(e) => {
            setRole(e.target.value);
          }}
          disabled={loggedUser?.role !== UserRole.Admin ? true : false}
          required
        >
          <MenuItem value={UserRole.Trainee}>Trainee</MenuItem>
          <MenuItem value={UserRole.Instructor}>Instructor</MenuItem>
          <MenuItem value={UserRole.Admin}>Admin</MenuItem>
        </Select>

        <Button variant="contained" endIcon={<SendIcon />} type="submit">
          Submit
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default UserInput;
