import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Story} from "../entity/Story";
import { User } from "../entity/User";

/**
 * Saves given post.
 */
export async function createUserStory(request: Request, response: Response) {

    // check api headers and get user
    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);
    let user = await userRepository.findOne(1);

    // get a story repository to perform operations with post
    const storyRepository = getManager().getRepository(Story);

    // create a real story object from post json object sent over http
    const newStory = storyRepository.create(request.body);
    newStory['user'] = user;

    // save received post
    await storyRepository.save(newStory);

    // return saved post back
    response.send(newStory);
}
