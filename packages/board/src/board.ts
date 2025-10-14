import User from "./types/user.types"

export interface Persister {
    findUserById(id: string): Promise<User | null>
    // saveUser(userToCreate: User): Promise<void>
}