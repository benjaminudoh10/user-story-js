import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from './User';

@Entity()
export class Story {

    @PrimaryGeneratedColumn()
    id: number;

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

    @ManyToOne(type => User, user => user.id)
    user: User;

    @Column()
    last_edited_by: number

    @Column()
    assigned_for_approval: boolean

    @Column()
    approved: boolean

}
