import { User } from "@kanban/identity/types";
import { hashPassword } from "./utils";

export interface Persister {
    findUserById(id: string): Promise<User | null>
    saveUser(userToCreate: User): Promise<void>
}



export class Identity {
    constructor(private userRepo: Persister) { }
    async createUser(name: string, email: string, password: string) {
        const hashedPassword = await hashPassword(password)
        const user: User = User.create({ name: name, email: email, passwordHash: hashedPassword })
        return this.userRepo.saveUser(user)
    }

}