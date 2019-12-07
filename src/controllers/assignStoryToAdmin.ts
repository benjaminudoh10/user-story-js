import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Story} from "../entity/Story";

/**
 * Assigns a story to admin for approval.
 */
export async function assignStoryToAdmin(request: Request, response: Response) {

    // get a story repository to perform operations with story
    const storyRepository = getManager().getRepository(Story);

    // get the story to assign to admin from db
    const newStory = await storyRepository.findOne(request.params.id);
    newStory.assigned_for_approval = true;

    // save received post
    await storyRepository.save(newStory);

    // return saved post back
    response.send(newStory);
}
