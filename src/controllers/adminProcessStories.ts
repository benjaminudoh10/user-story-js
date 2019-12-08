import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Story} from "../entity/Story";
import { User } from "../entity/User";
import { adminProcessStoriesService } from "../services/adminProcessStoriesService";

/**
 * Allows admin to either approve or reject a story.
 */
export async function adminProcessStories(request: Request, response: Response) {

    const api_key = request.header('X-STORY-AUTH');

    const story_id = Number(request.params.id);
    const action = request.params.action;

    const story = await adminProcessStoriesService(story_id, action, api_key);

    // return saved story back
    response.send(story);
}
