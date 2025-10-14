import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";

import * as board from "@kanban/board"


export class UserRepository implements board.Persister {
    private repository: Repository<User>

    constructor(repository: board.Persister) {
        this.repository = AppDataSource.getRepository(User);
    }

    async findUserById(id: string): Promise<User | null> {
        return this.repository.findOneBy({ id })
    }
}