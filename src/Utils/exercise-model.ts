import { IdType } from './shared-types';
export enum ExerciseStatus {
  Active = 1, Completed
}

export enum ExerciseType {
  Reps = 1, Hold
}

export interface ExerciseListener {
  (exercise: Exercise): void;
}

export type ExerciseFilterType = ExerciseStatus | undefined;

export interface ExerciseFilterChangeListener {
  (filter: ExerciseFilterType): void;
}

export class Exercise {
  constructor(
    public id: IdType,
    public userId: IdType,
    public text: string,
    public type: ExerciseType,
    public reps?: number,
    public hold?: number,
    public status = ExerciseStatus.Active
  ) { }
}