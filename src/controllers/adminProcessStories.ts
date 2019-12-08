import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Story} from "../entity/Story";
import { User } from "../entity/User";

/**
 * Allows admin to either approve or reject a story.
 */
export async function adminProcessStories(request: Request, response: Response) {

    const api_key = request.header('X-STORY-AUTH');

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // get user corresponding to the api_key from the header
    let user = await userRepository.findOne({ api_key: api_key });

    if (!user) {
        response.send({
            'message': 'Invalid api key provided.',
            'code': 403
        });
        return;
    }

    if (user && user.role != 'admin') {
        response.send({
            'message': 'Only admin can view all stories assigned for approval.',
            'code': 403
        });
        return;
    }

    // get a story repository to perform operations with story
    const storyRepository = getManager().getRepository(Story);

    // get the story from db
    const id = Number(request.params.id);
    const action = request.params.action;

    const story = await storyRepository.findOne({
        assigned_for_approval: true,
        id: id
    });
    if (!story) {
        response.send({
            'message': `Story with id ${id} has not been assigned for approval by the owner.`,
            'code': 403
        });
        return;
    }

    if (action == 'approve') {
        story.approved = story.active = true;
    } else if (action == 'reject') {
        story.approved = story.active = false;
    }

    story.last_edited_by = user.id;

    // save edited story
    await storyRepository.save(story);

    // return saved story back
    response.send(story);
}
