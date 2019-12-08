import { getRepository } from "typeorm";
import { User } from "../entity/User";

export async function userGetAllStoriesService(api_key: string) {
    try {
        // get a user repository to perform operations with user
        const userRepository = getRepository(User);

        // get user corresponding to the api_key from the header
        let user = await userRepository.findOne({
            relations: ["stories"],
            where: { 
                api_key: api_key
            }
        });

        if (!user) {
            return {
                'message': 'Invalid api key provided.',
                'code': 403
            }
        }

        return user.stories.filter((story) => story.active != false);
    } catch (error) {
        return {
            'message': `An error has occured ${error}`,
            'code': 500
        }
    }
}