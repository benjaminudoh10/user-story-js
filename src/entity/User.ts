import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany
} from "typeorm";
import {Story} from "./Story";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @OneToMany(type => Story, story => story.user)
    stories: Story[];

}
