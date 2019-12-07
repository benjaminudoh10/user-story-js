import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Story} from "../entity/Story";
import { User } from "../entity/User";

/**
 * Assigns a story to admin for approval.
 */
export async function assignStoryToAdmin(request: Request, response: Response) {

    const api_key = request.header('X-STORY-AUTH');
    if (!api_key) {
        response.send({
            'message': 'Forbidden. No api_key present',
            'code': 401
        });
        return;
    }

    // get a user repository to perform operations with user
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

    // get a story repository to perform operations with story
    const storyRepository = getManager().getRepository(Story);

    // get the story to assign to admin from db
    const newStory = await storyRepository.findOne({
        relations: ['user'],
        where: {id: Number(request.params.id)}
    });

    if (newStory.user.id != user.id) {
        response.send({
            'message': 'Forbidden. You don\'t have access to this story.',
            'code': 403
        });
        return;
    }
    newStory.assigned_for_approval = true;

    // save received post
    await storyRepository.save(newStory);

    // return saved post back
    response.send(newStory);
}
