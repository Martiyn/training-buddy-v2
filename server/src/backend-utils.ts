import { IdType } from "../../src/Utils/shared-types";
import { OptionalUnlessRequiredId, WithId } from "mongodb";
import { ServerIdentifiable } from "./model/repository-model";

export const sendErrorResponse = function (req, res, status = 500, message, err = null) {
    if (req.get('env') === 'production') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    })
}

export function replaceWithId<T extends ServerIdentifiable>(entity: WithId<T> | OptionalUnlessRequiredId<T>): T {
    const id: IdType = entity._id.toString() as IdType;
    delete entity._id;
    let result = Object.assign({}, entity) as T;
    result.id = id;
    return result;
}

export function replaceWith_id<T extends ServerIdentifiable>(dto: T): WithId<T> {
    const id = dto.id;
    delete dto.id;
    return Object.assign({}, dto, { _id: id }) as unknown as WithId<T>;
}