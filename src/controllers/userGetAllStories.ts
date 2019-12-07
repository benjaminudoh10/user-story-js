import {Request, Response} from "express";
import {getManager} from "typeorm";
import { User } from "../entity/User";

/**
 * List all stories that have been assigned for approval by admin.
 */
export async function userGetAllStories(request: Request, response: Response) {

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
    let user = await userRepository.findOne({
        relations: ["stories"],
        where: { 
            api_key: api_key
        }
    });

    if (!user) {
        response.send({
            'message': 'Invalid api key provided.',
            'code': 403
        });
        return;
    }

    response.send(user.stories.filter((story) => story.active != false));
}
