import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Story} from "../entity/Story";
import { User } from "../entity/User";

/**
 * List all stories that have been assigned for approval by admin.
 */
export async function adminGetAllStories(request: Request, response: Response) {

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

    // finds all assigned stories in db
    const allAssignedStories = await storyRepository.find({
        assigned_for_approval: true
    });

    // return all assigned stories
    response.send(allAssignedStories);
}
