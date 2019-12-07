import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Story} from "../entity/Story";

/**
 * List all stories that have been assigned for approval by admin.
 */
export async function adminGetAllStories(request: Request, response: Response) {

    // get a story repository to perform operations with story
    const storyRepository = getManager().getRepository(Story);

    // finds all assigned stories in db
    const allAssignedStories = await storyRepository.find({ assigned_for_approval: true });

    // return all assigned stories
    response.send(allAssignedStories);
}
