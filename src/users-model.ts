import { IdType } from "./shared-types";

export enum UserStatus {
    Active = 1, Suspended, Deactivated
}

export enum UserGender {
    Male = 1, Female
}

export enum UserRole {
    User = 1, Admin
}

export interface User {
    id: IdType;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    gender: UserGender;
    role: UserRole;
    picture: string;
    shortDescription: string;
    status: UserStatus.Active;
    registeredOn: Date;
    modifiedOn: Date;
}