import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany,
    Generated, Unique, CreateDateColumn, UpdateDateColumn, Check
} from "typeorm";
import { Story } from "./Story";

@Entity()
@Unique(["email"])
@Check(`"role" == 'user' OR "role" == 'admin'`)
export class User {

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
    email: string;

    @Column()
    password: string;

    @Column({ default: "user" })
    role: string;

    @Column()
    @Generated("uuid")
    api_key: string;

    @OneToMany(type => Story, story => story.user)
    stories: Story[];

}
