import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTokenService from '@modules/authentication/services/CreateTokenService';

export default class AuthenticationController {
  public async createToken(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createToken = container.resolve(CreateTokenService);

    const token = await createToken.execute();

    return response.json(token);
  }
}
