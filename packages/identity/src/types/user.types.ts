import { v4 } from "uuid"
import id from "zod/v4/locales/id.js";
import { hashPassword } from "@kanban/identity/utils";


export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export class User {
    private constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public passwordHash: string,
        readonly status: UserStatus
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.status = status
    }

    public static async create(name: string,
        email: string,
        passwordPlainText: string
    ): Promise<User> {
        const hashedPassword = await hashPassword(passwordPlainText)

        return new User(v4(), name, email, hashedPassword, UserStatus.ACTIVE);
    }

    public static fromPersistence(
        id: string,
        name: string,
        email: string,
        passwordHash: string,
        status: UserStatus
    ): User {
        return new User(id, name, email, passwordHash, status);
    }
}
