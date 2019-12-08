import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne,
    CreateDateColumn, UpdateDateColumn, Index, Check
} from "typeorm";
import { User } from '../entity/User';

@Entity()
@Check(`"complexity" == 'easy' OR "complexity" == 'medium' OR "complexity" == 'difficult' OR "complexity" == 'np-hard'`)
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
    name: string;

    @Column()
    summary: string;

    @Column("text")
    description: string;

    @Column()
    type: string;

    @Column()
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
