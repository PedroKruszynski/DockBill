import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  name: string;
  cpf: string;
  birthDate: Date;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    // do nothing.
  }

  public async execute({
    email, name, cpf, birthDate,
  }: IRequest): Promise<User> {
    const checkUserExist = await this.usersRepository.findByEmailOrCpf(email, cpf);

    const date = new Date(birthDate);

    if (date > new Date()) {
      throw new AppError('Birth Date have to be before today');
    }

    if (checkUserExist) {
      throw new AppError('User already exist');
    }

    const user = await this.usersRepository.create({
      email,
      name,
      cpf,
      birthDate,
    });

    return user;
  }
}

export default CreateUserService;
