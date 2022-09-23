import React, {
  Component,
  BaseSyntheticEvent,
  useCallback,
  useState,
} from "react";
import { Exercise } from "../Utils/exercise-model";
import { ExerciseListener } from "../Utils/exercise-model";
import { IdType, Optional } from "../Utils/shared-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "../UserNotLoggedComponent/InputText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";

interface ExerciseInputProps {
  userId: IdType;
  editExercise: Optional<Exercise>;
  onSubmitExercise: ExerciseListener;
}

type FormData = {
  id: IdType;
  text: string;
};

const schema = yup
  .object({
    text: yup.string().required().min(2).max(50),
  })
  .required();

function UserInput({
  userId,
  editExercise,
  onSubmitExercise,
}: ExerciseInputProps) {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { ...editExercise },
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleUserSubmit = (
    data: FormData,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    onSubmitExercise(
      new Exercise(data.id ? data.id : undefined, userId, data.text)
    );
    setValue("text", "");
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
          name="text"
          label="Type in exercise here"
          control={control}
          error={errors.text?.message}
          rules={{ required: true, minLength: 2, maxLength: 15 }}
        />
        <Button variant="contained" endIcon={<SendIcon />} type="submit">
          Submit
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default UserInput;
