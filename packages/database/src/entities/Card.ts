import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { List } from "./List";
import { v4 } from "uuid";

@Entity()
export class Card {
    @PrimaryColumn("uuid")
    id!: string
    @Column()
    title!: string
    @Column()
    content!: string
    @Column()
    position!: number

    @ManyToOne(() => List, { onDelete: "CASCADE" })
    @JoinColumn({ name: "list_id" })
    listId!: string

    @BeforeInsert()
    generateID() {
        if (!this.id) {
            this.id = v4();
        }
    }

}