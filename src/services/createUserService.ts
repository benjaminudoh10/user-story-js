import { getRepository } from "typeorm";
import { User } from "../entity/User";

export async function createUserService(body: User) {
    // get a user repository to perform operations with user
    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ email: body.email });
    
        if (user != undefined) {
            return {
                'message': `User with email ${body.email} already exists.`,
                'code': 403
            }
        }
    
        // create a user object from post json object sent over http
        const newUser = userRepository.create(body);
    
        // save received post
        await userRepository.save(newUser);
        return newUser;
    } catch (error) {
        return {
            'message': `An error has occured ${error}`,
            'code': 500
        }
    }
}
