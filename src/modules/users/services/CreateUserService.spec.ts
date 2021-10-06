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
      name: 'Jhon Doe',
      cpf: '40537183847',
      birthDate: new Date('Wed Oct 06 2000'),
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email or cpf from another', async () => {
    const fakeUserRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(
      fakeUserRepository,
    );

    await createUser.execute({
      email: 'jhon.doe@example.com',
      name: 'Jhon Doe',
      cpf: '40537183847',
      birthDate: new Date('Wed Oct 06 2000'),
    });

    expect(
      createUser.execute({
        email: 'jhon.doe@example.com',
        name: 'Jhon Doe',
        cpf: '40537183847',
        birthDate: new Date('Wed Oct 06 2000'),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with the birth date before today', async () => {
    const fakeUserRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(
      fakeUserRepository,
    );

    const date = new Date();
    date.setDate(date.getDate() + 1);

    expect(
      createUser.execute({
        email: 'jhon.doe@example.com',
        name: 'Jhon Doe',
        cpf: '40537183847',
        birthDate: date,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
