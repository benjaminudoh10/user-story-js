import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/User";

const uuidv5 = require('uuid/v5');
const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

/**
 * Creates a new User.
 */
export async function createUser(request: Request, response: Response) {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // create a real user object from post json object sent over http
    const newUser = userRepository.create(request.body);

    // Add user api key
    const api_key = uuidv5(request.body.username, MY_NAMESPACE);
    console.log('User api key is: ', api_key);
    newUser['api_key'] = api_key;

    // save received post
    await userRepository.save(newUser);

    // return saved post back
    response.send(newUser);
}
