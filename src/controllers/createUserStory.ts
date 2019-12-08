import {Request, Response} from "express";
import { createUserStoryService } from "../services/createUserStoryService";

/**
 * Create a new story for a user.
 */
export async function createUserStory(request: Request, response: Response) {

    const api_key = request.header('X-STORY-AUTH');

    const newStory = await createUserStoryService(request.body, api_key);

    // return saved post back
    response.send(newStory);
}
