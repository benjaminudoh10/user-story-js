import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/User";

/**
 * Creates a new User.
 */
export async function createUser(request: Request, response: Response) {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // create a real user object from post json object sent over http
    const newUser = userRepository.create(request.body);

    // save received post
    await userRepository.save(newUser);

    // return saved post back
    response.send(newUser);
}
