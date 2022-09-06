import { useState } from "react";
import { IdType, Optional, UserListener } from "./shared-types";
import {
  toIsoDate,
  User,
  UserGender,
  UserRole,
  UserStatus,
} from "./users-model";
import React, { BaseSyntheticEvent, FormEvent } from "react";
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
    firstName: yup.string().required().min(2).max(10),
    lastName: yup.string().required().min(2).max(10),
    userName: yup.string().required().min(2).max(15),
    password: yup.string().required().min(5).max(15),
    gender: yup.number().min(1).max(2),
    role: yup.number().min(1).max(2),
    picture: yup.string().required().url(),
    shortDescription: yup.string().required().min(20).max(1000),
    status: yup.number().min(1).max(3),
  })
  .required();

function UserInput({ editUser, loggedUser, onSubmitUser }: UserInputProps) {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    reset,
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

  const onReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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
          rules={{ required: true, minLength: 2, maxLength: 10 }}
        />
        <InputText
          name="lastName"
          label="Last Name"
          control={control}
          error={errors.lastName?.message}
          rules={{ required: true, minLength: 2, maxLength: 10 }}
        />
        <InputText
          name="userName"
          label="User Name"
          control={control}
          error={errors.userName?.message}
          rules={{ required: true, minLength: 2, maxLength: 15 }}
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
          rules={{ required: true, minLength: 5, maxLength: 15 }}
        />
        <InputText
          name="shortDescription"
          label="short Description"
          control={control}
          error={errors.shortDescription?.message}
          rules={{ required: true, minLength: 20, maxLength: 1000 }}
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
          required
        >
          <MenuItem value={UserRole.User}>User</MenuItem>
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
