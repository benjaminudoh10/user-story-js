import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Story } from "../entity/Story";

export async function assignStoryToAdminService(story_id: number, api_key: string) {
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

        // get a story repository to perform operations with story
        const storyRepository = getRepository(Story);

        // get the story to assign to admin from db
        const story = await storyRepository.findOne({
            relations: ['user'],
            where: { id: story_id }
        });

        if (!story) {
            return {
                message: `Story with id ${story_id} does not exist`,
                code: 404
            }
        }

        if (story.user.id != user.id) {
            return {
                'message': 'Forbidden. You don\'t have access to this story.',
                'code': 403
            }
        }
        story.assigned_for_approval = true;
        story.last_edited_by = user.id;

        // save received post
        await storyRepository.save(story);
        return story;
    } catch (error) {
        return {
            'message': `An error has occured ${error}`,
            'code': 500
        }
    }
}