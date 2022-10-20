import { IdType } from '../Utils/shared-types';
import { User } from '../Utils/users-model';
import { ApiClientImpl, API_BASE_URL } from './rest-api-client'

export interface AuthUser {
    token: string,
    user: User
}

export interface UsersApiClient<K, V> {
    login(entity: Partial<V>): Promise<V>;
}

export class UsersApiClientImpl<K extends IdType, V extends AuthUser> extends ApiClientImpl<IdType, User> implements UsersApiClient<K, V> {
    constructor(public apiCollectionSuffix: string) {
        super('users');
    }
    login(entity: Partial<V>): Promise<V> {
        return this.handleRequest(`${API_BASE_URL}/${this.apiCollectionSuffix}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(entity)
        });
    }
}

export const ExtendedUsersApi: UsersApiClient<IdType, AuthUser> = new UsersApiClientImpl('users');