import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne,
    CreateDateColumn, UpdateDateColumn, Index
} from "typeorm";
import { User } from '../entity/User';

@Entity()
export class Story {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    created: Date;

    @Column({ nullable: true })
    @UpdateDateColumn()
    modified: Date;

    @Column()
    summary: string;

    @Column("text")
    description: string;

    @Column()
    type: string;

    @Column({
        // There is a bug with enum on typeorm
        // enum: ["easy", "medium", "difficult", "np-hard"]
    })
    complexity: string;

    @Column()
    eta: Date;

    @Column()
    cost: number;

    @ManyToOne(type => User, user => user.stories)
    user: User;

    @Column()
    last_edited_by: number

    @Column()
    assigned_for_approval: boolean

    @Column({ nullable: true })
    approved: boolean

    @Index()
    @Column({ nullable: true })
    active: boolean

}
