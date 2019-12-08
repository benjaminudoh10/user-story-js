import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Story } from "../entity/Story";

export async function createUserStoryService(body: Story, api_key: string) {
    try {
        const userRepository = getRepository(User);
    
        // get user corresponding to the api_key from the header
        let user = await userRepository.findOne({ api_key: api_key });
        if (!user) {
            return {
                'message': 'Inavlid api key.',
                'code': 403
            }
        }
        // get a story repository to perform operations with post
        const storyRepository = getRepository(Story);
    
        // create a real story object from post json object sent over http
        const newStory = storyRepository.create(body);
        newStory['assigned_for_approval'] = false;
    
        newStory['user'] = user;
        newStory['last_edited_by'] = user.id;
    
        // save received post
        await storyRepository.save(newStory);
        return newStory;
    } catch (error) {
        return {
            'message': `An error has occured ${error}`,
            'code': 500
        }
    }
}
