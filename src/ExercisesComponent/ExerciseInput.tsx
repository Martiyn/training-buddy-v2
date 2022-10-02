import React, {
  Component,
  BaseSyntheticEvent,
  useCallback,
  useState,
} from "react";
import { Exercise, ExerciseType } from "../Utils/exercise-model";
import { ExerciseListener } from "../Utils/exercise-model";
import { IdType, Optional } from "../Utils/shared-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "../InputTemplates/InputText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { MenuItem, Select, TextField } from "@mui/material";

interface ExerciseInputProps {
  userId: IdType;
  editExercise: Optional<Exercise>;
  onSubmitExercise: ExerciseListener;
}

type FormData = {
  id: IdType;
  text: string;
  type: ExerciseType;
  reps?: number;
  hold?: number;
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
  const [type, setType] = useState<string>(editExercise?.type.toString() || "1");
  const [reps, setReps] = useState<string>(editExercise?.reps?.toString() || "0");
  const [hold, setHold] = useState<string>(editExercise?.hold?.toString() || "0");
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

  const handleExerciseSubmit = (
    data: FormData,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    onSubmitExercise(
      new Exercise(
        data.id ? data.id : undefined,
        userId,
        data.text,
        parseInt(type),
        parseInt(reps),
        parseInt(hold)
      )
    );
    setValue("text", "");
    setValue("type", 1);
    setReps("0");
    setHold("0");
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
        onSubmit={handleSubmit(handleExerciseSubmit)}
      >
        <InputText
          name="text"
          label="Type in exercise here"
          control={control}
          error={errors.text?.message}
          rules={{ required: true, minLength: 2, maxLength: 15 }}
        />

        <label htmlFor="Type" color="primary">
          Exercise type:{"  "}
        </label>
        <Select
          sx={{
            backgroundColor: "#118bee",
          }}
          name="type"
          value={type}
          label="type"
          onChange={(event) => {
            setType(event.target.value);
            parseInt(event.target.value) === 1 ? setHold("0") : setReps("0");
          }}
          required
        >
          <MenuItem value={ExerciseType.Reps}>Reps</MenuItem>
          <MenuItem value={ExerciseType.Hold}>Hold</MenuItem>
        </Select>

        <TextField
          type="number"
          name="Reps"
          InputProps={{ inputProps: { min: 0 } }}
          label="Repetitions"
          variant="filled"
          value={reps}
          onChange={(event) => setReps(event.target.value)}
          disabled={parseInt(type) !== 1}
          required
        />

        <TextField
          type="number"
          name="Hold"
          InputProps={{ inputProps: { min: 0 } }}
          label="Seconds"
          variant="filled"
          value={hold}
          onChange={(event) => setHold(event.target.value)}
          disabled={parseInt(type) !== 2}
          required
        />
        <Button variant="contained" endIcon={<SendIcon />} type="submit">
          Submit
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default UserInput;
