import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Board {
    @PrimaryColumn("uuid")
    id!: string
    @Column()
    title!: string

    @ManyToOne(() => User, { onDelete: "CASCADE" })

    @JoinColumn({ name: "user_id" })
    userId!: string
}