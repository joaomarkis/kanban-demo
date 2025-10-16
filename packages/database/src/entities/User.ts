import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, PrimaryColumn } from "typeorm"
import { v4 } from "uuid"
import * as identity from "@kanban/identity/types"
import { hashPassword } from "@kanban/identity"

@Entity()
export class User {

    @PrimaryColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    passwordHash!: string

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

    @BeforeInsert()
    generateID() {
        if (!this.id) {
            this.id = v4();
        }
    }

    public static fromDomain(user: identity.User): User {
        return new User({
            id: user.id,
            email: user.email,
            name: user.name,
            passwordHash: user.passwordHash
        })
    }

}
