import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAccountsService from '@modules/accounts/services/CreateAccountService';
import GetBalanceService from '@modules/accounts/services/GetBalanceService';
import BlockAccountService from '@modules/accounts/services/BlockAccountService';

export default class UsersController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      idUser, balance, withdrawalsDailyLimit, active, typeAccount,
    } = request.body;

    const createAccount = container.resolve(CreateAccountsService);

    const account = await createAccount.execute({
      idUser,
      balance,
      withdrawalsDailyLimit,
      active,
      typeAccount,
    });

    return response.json(account);
  }

  public async getBalance(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { idAccount } = request.params;

    const getBalance = container.resolve(GetBalanceService);

    const account = await getBalance.execute({
      idAccount,
    });

    return response.json(account);
  }

  public async blockAccount(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { idAccount } = request.params;

    const blockAccount = container.resolve(BlockAccountService);

    const account = await blockAccount.execute({
      idAccount,
    });

    return response.json(account);
  }
}
