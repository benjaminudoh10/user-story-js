import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Story} from "../entity/Story";

/**
 * Allows admin to either approve or reject a story.
 */
export async function adminProcessStories(request: Request, response: Response) {

    // get a story repository to perform operations with story
    const storyRepository = getManager().getRepository(Story);

    // get the story from db
    const story = await storyRepository.findOne(request.params.id);
    const action = request.params.action;
    
    if (action == 'approve') story.approved = true;
    else if (action == 'reject') story.approved = false;

    // save edited story
    await storyRepository.save(story);

    // return saved story back
    response.send(story);
}
