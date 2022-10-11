import { IdType } from "../../../src/Utils/shared-types"

export interface ServerIdentifiable {
    id: IdType;
}

export interface Repository<T extends ServerIdentifiable> {
    create(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    deleteById(id: IdType): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: IdType): Promise<T>;
}
