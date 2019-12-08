import {Request, Response} from "express";
import { adminGetAllStoriesService } from "../services/adminGetAllStoriesService";

/**
 * List all stories that have been assigned for approval by admin.
 */
export async function adminGetAllStories(request: Request, response: Response) {

    const api_key = request.header('X-STORY-AUTH');

    const allAssignedStories = await adminGetAllStoriesService(api_key);
    // return all assigned stories
    response.send(allAssignedStories);
}
