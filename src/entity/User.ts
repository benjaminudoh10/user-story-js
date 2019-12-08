import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany,
    Generated, Unique, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { Story } from "./Story";

@Entity()
@Unique(["username", "email", "api_key"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    @Column({ nullable: true })
    modified: Date;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        // There is a bug with enum on typeorm
        // enum: ["user", "admin"],
        default: "user"
    })
    role: string;

    @Column()
    @Generated("uuid")
    api_key: string;

    @OneToMany(type => Story, story => story.user)
    stories: Story[];

}
