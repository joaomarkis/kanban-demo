import { User } from "@kanban/identity/types";
import { checkPassword, hashPassword } from "../utils";
import IdentityErrors from "./errors";
import { JwtHandler } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export interface Persister {
    findUserById(id: string): Promise<User | null>
    findUserByCredential(credential: string): Promise<User | null>
    saveUser(userToCreate: User): Promise<void>
}



export class Identity {
    constructor(private userRepo: Persister) { }
    async register(name: string, email: string, password: string) {
        let user: User | null
        //check if this credential is avaiable
        user = await this.userRepo.findUserByCredential(email)
        if (user) {
            throw new IdentityErrors({
                name: 'USER_ALREADY_EXISTS',
                message: "User already exists with this kind of credential"
            })
        }
        user = await User.create(name, email, password)
        return this.userRepo.saveUser(user)
    }

    async login(credential: string, password: string) {
        //first search for user by credential
        const authError = new IdentityErrors({
            name: "AUTH_FAILED",
            message: "Invalid credentials provided."
        });

        const user = await this.findUserByCredential(credential)
        if (!user) {
            throw authError
        }
        const challenge = await checkPassword(password, user.passwordHash)
        if (!challenge) {
            throw authError
        }
        const payload: JwtPayload = { sub: user.id }
        const token = await JwtHandler.signJWT(payload)
        return token
    }
    async findUserByCredential(credential: string) {
        const user = await this.userRepo.findUserByCredential(credential)
        return user
    }
}