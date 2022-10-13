import { Db } from "mongodb";
import { User } from "../../../src/Utils/users-model.js";
import { replaceWithId } from "../backend-utils.js";
import { MongodbRepository } from "./mongodb-repository.js";

export class UserRepository extends MongodbRepository<User> {
    constructor(protected db: Db, protected collection: string) {
        super(db, collection);
    }
    async findByUsername(userName: string): Promise<User> {
        const user = await this.db.collection<User>(this.collection).findOne({ userName });
        return user ? replaceWithId(user) : undefined;
    }
}