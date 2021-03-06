import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      email, name, cpf, birthDate,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      name,
      cpf,
      birthDate,
    });

    return response.json(user);
  }
}
