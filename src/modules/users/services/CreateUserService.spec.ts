import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(
      fakeUserRepository,
    );

    const user = await createUser.execute({
      email: 'jhon.doe@example.com',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(
      fakeUserRepository,
    );

    await createUser.execute({
      email: 'jhon.doe@example.com',
    });

    expect(
      createUser.execute({
        email: 'jhon.doe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
