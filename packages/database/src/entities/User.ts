import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, PrimaryColumn } from "typeorm"
import { v4 } from "uuid"

@Entity()
export class User {

    @PrimaryColumn("uuid")
    id!: string

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column()
    email!: string

    @Column()
    passwordHash!: string

    @BeforeInsert()
    generateID() {
        if (!this.id) {
            this.id = v4();
        }
    }

}
