import typeorm = require('typeorm')
import { User } from '../entity/User';
import { createUserService } from '../services/createUserService';

(typeorm as any).getRepository = jest.fn();

describe('The createUserService', () => {
  describe('when registering a user', () => {
    describe('if the email has been taken', () => {
      it('should return a response with the code key equal to 403', async () => {
        const userData = {
            "name": "Ben",
            "email": "beadmin@gmail.com",
            "password": "benisaguy",
            "role": "admin"
        };
        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.password = userData.password;
        user.role = userData.role;

        (typeorm as any).getRepository.mockReturnValue({
          findOne: () => Promise.resolve(user)
        });
        const registrationService = createUserService(user);
        await expect(registrationService).resolves.toMatchObject({
            'message': `User with email ${user.email} already exists.`,
            'code': 403
        });
      });
    });
  });
});

describe('The createUserService', () => {
    describe('when registering a user', () => {
        describe('if the email is not taken', () => {
            it('should not throw an error', async () => {
                const userData = {
                    "name": "Ben",
                    "email": "beadmin@gmail.com",
                    "password": "benisaguy",
                    "role": "admin"
                };
                const user = new User();
                user.name = userData.name;
                user.email = userData.email;
                user.password = userData.password;
                user.role = userData.role;
        
                (typeorm as any).getRepository.mockReturnValue({
                    findOne: () => Promise.resolve(undefined),
                    create: () => ({
                        ...userData,
                        id: 1,
                    }),
                    save: () => Promise.resolve()
                });
                const registrationService = createUserService(user);
                await expect(registrationService).resolves.toBeDefined();
            });
        });
    });
});

describe('The createUserService', () => {
    describe('when registering a user', () => {
        describe('if the email is not taken', () => {
            it('should return an object which contains the user data', async () => {
                const userData = {
                    "name": "Ben",
                    "email": "beadmin@gmail.com",
                    "password": "benisaguy",
                    "role": "admin"
                };
                const user = new User();
                user.name = userData.name;
                user.email = userData.email;
                user.password = userData.password;
                user.role = userData.role;
        
                (typeorm as any).getRepository.mockReturnValue({
                    findOne: () => Promise.resolve(undefined),
                    create: () => ({
                        ...userData,
                        id: 1,
                    }),
                    save: () => Promise.resolve()
                });
                const registrationService = createUserService(user);
                await expect(registrationService).resolves.toMatchObject({
                    ...userData,
                    id: 1,
                });
            });
        });
    });
});
