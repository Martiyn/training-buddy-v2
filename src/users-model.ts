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

export class User {
    constructor(
    public id: IdType = undefined,
    public firstName: string,
    public lastName: string,
    public userName: string,
    public password: string,
    public gender: UserGender,
    public role: UserRole,
    public picture: string,
    public shortDescription: string,
    public status: UserStatus.Active,
    public registeredOn: string = toIsoDate(new Date()),
    public modifiedOn: string = toIsoDate(new Date()),
    ){}
}

export function toIsoDate(date: Date) {
    return date.toISOString().split('T')[0];
}