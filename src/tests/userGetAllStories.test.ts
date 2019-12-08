import typeorm = require('typeorm')
import { User } from '../entity/User';
import { createUserService } from '../services/createUserService';
import { createUserStoryService } from '../services/createUserStoryService';
import { Story } from '../entity/Story';
import { userGetAllStoriesService } from '../services/userGetAllStoriesService';

(typeorm as any).getRepository = jest.fn();

describe('The userGetAllStoriesService', () => {
    describe('when getting all stories', () => {
        describe('if the api_key does not exist', () => {
            it('should return a response with the code key equal to 403', async () => {
                const storyData = {
                    "name": "Best",
                    "summary": "First story",
                    "description": "A very touching story",
                    "type": "bug",
                    "complexity": "np-hard",
                    "cost": 45,
                    "eta": "2019-11-12"
                };
                const story = new Story();
                story.name = storyData.name;
                story.summary = storyData.summary;
                story.description = storyData.description;
                story.type = storyData.type;
                story.complexity = storyData.complexity;
                story.cost = storyData.cost;
                story.eta = new Date(storyData.eta);
        
                (typeorm as any).getRepository.mockReturnValue({
                    findOne: () => Promise.resolve(undefined)
                });
                const getAllUserStoriesService = userGetAllStoriesService('test_api_key');
                await expect(getAllUserStoriesService).resolves.toMatchObject({
                    'message': 'Invalid api key provided.',
                    'code': 403
                });
            });
        });
    });
});

describe('The userGetAllStoriesService', () => {
  describe('when creating a story', () => {
    describe('if the api_key exists', () => {
      it('should return a story object', async () => {
        const storyData = {
            "name": "Best",
            "summary": "First story",
            "description": "A very touching story",
            "type": "bug",
            "complexity": "np-hard",
            "cost": 45,
            "eta": "2019-11-12"
        };
        const story = new Story();
        story.name = storyData.name;
        story.summary = storyData.summary;
        story.description = storyData.description;
        story.type = storyData.type;
        story.complexity = storyData.complexity;
        story.cost = storyData.cost;
        story.eta = new Date(storyData.eta);

        const userData = {
            "id": 1,
            "name": "Ben",
            "email": "beadmin@gmail.com",
            "password": "benisaguy",
            "role": "admin"
        };
        const user = new User();
        user.id = userData.id;
        user.name = userData.name;
        user.email = userData.email;
        user.password = userData.password;
        user.role = userData.role;
        user.stories = [story];

        (typeorm as any).getRepository.mockReturnValue({
            findOne: () => Promise.resolve(user)
        });
        const getAllUserStoriesService = userGetAllStoriesService('test_api_key');
        await expect(getAllUserStoriesService).resolves.toMatchObject([story]);
      });
    });
  });
});
