import { Repository } from "typeorm";
import { User as UserEntity } from "../entities/User";
import { AppDataSource } from "../data-source";

import * as identity from "@kanban/identity"
import { User } from "@kanban/identity/types";

import { ErrorBase } from "@kanban/shared/utils"

import PersistenceError from "./errors";

export class UserRepository implements identity.Persister {
    private repository: Repository<UserEntity>

    constructor(repository: identity.Persister) {
        this.repository = AppDataSource.getRepository(UserEntity);
    }

    async findUserById(id: string): Promise<User> {
        const entity = await this.repository.findOneBy({ id })
        if (!entity) {
            throw new PersistenceError({
                name: "USER_NOT_FOUND",
                message: "User not found"
            })
        }
        const user = entity.toDomain()
        return user
    }

    async findUserByCredential(credential: string): Promise<User | null> {
        const entity = await this.repository.findOneBy({ email: credential })
        if (!entity) {
            return null
        }
        const user = entity.toDomain()
        return user
    }

    async saveUser(userToCreate: User): Promise<void> {
        const entity = UserEntity.fromDomain(userToCreate)
        if (entity.id == null) {
            entity.generateID()
        }
        this.repository.save(entity)
    }

}