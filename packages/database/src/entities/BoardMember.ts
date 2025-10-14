import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Board } from "./Board";
import { User } from "./User";

export enum BoardRole {
    ADMIN = 'admin',
    MEMBER = 'member',
}

@Entity()
export class BoardMember {
    @PrimaryColumn("uuid")
    userId!: string;

    @PrimaryColumn("uuid")
    boardId!: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user!: User;

    @ManyToOne(() => Board, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'boardId' })
    board!: Board;

    @Column({
        type: 'enum',
        enum: BoardRole,
        default: BoardRole.MEMBER,
    })
    role!: BoardRole;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    joinedAt!: Date;
}