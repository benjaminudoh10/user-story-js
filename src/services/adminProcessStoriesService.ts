import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Story } from "../entity/Story";

export async function adminProcessStoriesService(
    story_id: number, action: string, api_key: string) {
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

        // get the story from db
        const story = await storyRepository.findOne({
            assigned_for_approval: true,
            id: story_id
        });
        if (!story) {
            return {
                'message': `Story with id ${story_id} has not been assigned for approval by the owner.`,
                'code': 403
            }
        }

        if (action == 'approve') {
            story.approved = story.active = true;
        } else if (action == 'reject') {
            story.approved = story.active = false;
        }

        story.last_edited_by = user.id;

        // save edited story
        await storyRepository.save(story);

        return story;
    } catch (error) {
        return {
            'message': `An error has occured ${error}`,
            'code': 500
        }
    }
}
