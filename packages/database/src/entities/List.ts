import { BeforeInsert, Collection, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Board } from "./Board";
import { v4 } from "uuid";


@Entity()
export class List {
    @PrimaryColumn("uuid")
    id!: string
    @Column()
    title!: string
    @Column()
    position!: number

    @ManyToOne(() => Board, { onDelete: "CASCADE" })
    @JoinColumn({ name: "board_id" })
    boardId!: string

    @BeforeInsert()
    generateID() {
        if (!this.id) {
            this.id = v4();
        }
    }

}