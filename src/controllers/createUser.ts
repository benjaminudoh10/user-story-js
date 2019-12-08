import {Request, Response} from "express";
import {createUserService} from "../services/createUserService";

/**
 * Creates a new User.
 */
export async function createUser(request: Request, response: Response) {

    const result = await createUserService(request.body);

    // return saved post back
    response.send(result);
}
