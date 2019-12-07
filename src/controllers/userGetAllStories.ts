import {Request, Response} from "express";
import {getManager} from "typeorm";
import { User } from "../entity/User";

/**
 * List all stories that have been assigned for approval by admin.
 */
export async function userGetAllStories(request: Request, response: Response) {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);
    // // get a story repository to perform operations with story
    // const storyRepository = getManager().getRepository(Story);

    const user = await userRepository.findOne(1, {relations: ['stories']});

    response.send(user.stories);
}
