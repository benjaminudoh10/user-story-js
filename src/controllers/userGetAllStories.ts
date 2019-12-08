import {Request, Response} from "express";
import { userGetAllStoriesService } from "../services/userGetAllStoriesService";

/**
 * List all stories that have been assigned for approval by admin.
 */
export async function userGetAllStories(request: Request, response: Response) {

    const api_key = request.header('X-STORY-AUTH');

    const stories = await userGetAllStoriesService(api_key);

    response.send(stories);
}
