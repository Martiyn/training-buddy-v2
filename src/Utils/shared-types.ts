import { User, UserRole, UserStatus } from "./users-model";


export type StatusFilterType = UserStatus;
export type RoleFilterType = UserRole;

export interface Identifiable<K> {
    id: K;
}

export type IdType = number | undefined | string;

export interface UserListener {
    (user: User): void;
}

export interface StatusFilterChangeListener {
    (statusFilter: StatusFilterType): void;
}

export interface RoleFilterChangeListener {
    (roleFilter: RoleFilterType): void;
}

export type Optional<V> = V | undefined