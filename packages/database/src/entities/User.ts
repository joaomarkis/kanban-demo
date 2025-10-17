import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, PrimaryColumn } from "typeorm"
import { v4 } from "uuid"
import * as identity from "@kanban/identity/types"

@Entity()
export class User {

    @PrimaryColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column()
    email!: string

    @Column({
        type: "enum",
        enum: identity.UserStatus,
    })
    status!: identity.UserStatus

    @Column()
    passwordHash!: string

    @BeforeInsert()
    generateID() {
        if (!this.id) {
            this.id = v4();
        }
    }

    public static fromDomain(user: identity.User): User {
        const entity = new User();
        entity.id = user.id,
        entity.email = user.email,
        entity.name = user.name,
        entity.passwordHash = user.passwordHash
        entity.status = user.status
        return entity
    }

    public toDomain(): identity.User {
        return identity.User.fromPersistence(
            this.id,
            this.name,
            this.email,
            this.passwordHash,
            this.status
        );
    }

}
