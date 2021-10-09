import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAccountsService from '@modules/accounts/services/CreateAccountService';
import GetBalanceService from '@modules/accounts/services/GetBalanceService';
import BlockAccountService from '@modules/accounts/services/BlockAccountService';
import WithdrawService from '@modules/accounts/services/WithdrawService';
import DepositService from '@modules/accounts/services/DepositService';

export default class AccountsController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      idUser, balance, withdrawDailyLimit, active, typeAccount,
    } = request.body;

    const createAccount = container.resolve(CreateAccountsService);

    const account = await createAccount.execute({
      idUser,
      balance,
      withdrawDailyLimit,
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

  public async withdraw(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { idAccount, value } = request.body;

    const withdrawService = container.resolve(WithdrawService);

    const account = await withdrawService.execute({
      idAccount,
      value,
    });

    return response.json(account);
  }

  public async deposit(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { idAccount, value } = request.body;

    const depositService = container.resolve(DepositService);

    const account = await depositService.execute({
      idAccount,
      value,
    });

    return response.json(account);
  }
}
