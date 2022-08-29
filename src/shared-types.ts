import { User, UserStatus } from "./users-model";


export type FilterType = UserStatus | undefined;

export interface Identifiable<K> {
    id: K;
}

export type IdType = number | undefined;

export interface UserListener {
    (user: User): void;
}

export interface FilterChangeListener {
    (filter: FilterType): void;
}

export type Optional<V> = V | undefined