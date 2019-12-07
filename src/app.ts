import "reflect-metadata";
import {createConnection} from "typeorm";
import {Story} from "./entity/Story";
import { User } from "./entity/User";

createConnection({
    type: "sqlite",
    database: "user-story.db",
    entities: [
        Story, User
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
    // Example to store and fetch entities from db
    let user = new User();
    user.name = 'Udoh Benjamin';
    user.email = 'benjaminudoh10@gmail.com';
    user.password = 'test';
    user.role = 'admin';
    user.username = 'benjaminudoh10';

    let userRepository = connection.getRepository(User);
    await userRepository.save(user);

    let story = new Story();
    story.summary = "Me and Bears";
    story.description = "I am near polar bears";
    story.type = "photo-with-bears.jpg";
    story.cost = 1;
    story.complexity = 'difficult';
    story.eta = new Date();
    story.user = user;
    story.last_edited_by = user.id;
    story.assigned_for_approval = false;
    story.approved = false;

    let storyRepository = connection.getRepository(Story);
    await storyRepository.save(story);

    let savedStories = await storyRepository.find({ relations: ["user"] });
    console.log(`All saved stories ${savedStories.map(
        story => JSON.stringify(story))}`);
}).catch(error => console.log(error));
