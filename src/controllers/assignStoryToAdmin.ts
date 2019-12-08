import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Story} from "../entity/Story";
import { User } from "../entity/User";
import { assignStoryToAdminService } from "../services/assignStoryToAdminService";

/**
 * Assigns a story to admin for approval.
 */
export async function assignStoryToAdmin(request: Request, response: Response) {

    const api_key = request.header('X-STORY-AUTH');
    const story_id = Number(request.params.id);
    const story = await assignStoryToAdminService(story_id, api_key);

    // return saved post back
    response.send(story);
}
