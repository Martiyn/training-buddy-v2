import { User, UserRole, UserStatus } from "./users-model";


export type StatusFilterType = UserStatus | undefined;
export type RoleFilterType = UserRole | undefined;

export interface Identifiable<K> {
    id: K;
}

export type IdType = number | undefined;

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