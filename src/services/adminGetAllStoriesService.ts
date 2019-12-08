import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Story } from "../entity/Story";

export async function adminGetAllStoriesService(api_key: string) {
    try {
        // get a user repository to perform operations with user
        const userRepository = getRepository(User);

        // get user corresponding to the api_key from the header
        let user = await userRepository.findOne({ api_key: api_key });

        if (!user) {
            return {
                'message': 'Invalid api key provided.',
                'code': 403
            }
        }

        if (user && user.role != 'admin') {
            return {
                'message': 'Only admin can view all stories assigned for approval.',
                'code': 403
            }
        }

        // get a story repository to perform operations with story
        const storyRepository = getRepository(Story);

        // finds all assigned stories in db
        const allAssignedStories = await storyRepository.find({
            assigned_for_approval: true
        });

        return allAssignedStories;
    } catch (error) {
        return {
            'message': `An error has occured ${error}`,
            'code': 500
        }
    }
}
