import { IdType } from './shared-types';
export enum ExerciseStatus {
    Active = 1, Completed, Canceled
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
        public text: string,
        // TODO: implement user id when creating exercise public userId: IdType,
        public status = ExerciseStatus.Active,
    ) {}
}