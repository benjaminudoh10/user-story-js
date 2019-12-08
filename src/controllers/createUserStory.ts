import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Story} from "../entity/Story";
import { User } from "../entity/User";

/**
 * Saves given post.
 */
export async function createUserStory(request: Request, response: Response) {

    const api_key = request.header('X-STORY-AUTH');
    const userRepository = getManager().getRepository(User);

    // get user corresponding to the api_key from the header
    let user = await userRepository.findOne({ api_key: api_key });
    if (!user) {
        response.send({
            'message': 'Inavlid api key.',
            'code': 403
        });
        return;
    }

    // get a story repository to perform operations with post
    const storyRepository = getManager().getRepository(Story);

    // create a real story object from post json object sent over http
    const newStory = storyRepository.create(request.body);
    newStory['assigned_for_approval'] = false;

    newStory['user'] = user;
    newStory['last_edited_by'] = user.id;

    // save received post
    await storyRepository.save(newStory);

    // return saved post back
    response.send(newStory);
}
