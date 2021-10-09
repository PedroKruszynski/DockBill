import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Account from '../infra/typeorm/entities/Account';
import IAccountsRepository from '../repositories/IAccountsRepository';

interface IRequest {
  idUser: string;
  balance: string;
  withdrawDailyLimit: string;
  active: boolean;
  typeAccount: number;
}

@injectable()
class CreateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {
    // do nothing.
  }

  public async execute({
    idUser, balance, withdrawDailyLimit, active, typeAccount,
  }: IRequest): Promise<Account> {
    const checkAccountUserExist = await this.accountsRepository.findByIdUser(idUser);

    if (checkAccountUserExist) {
      throw new AppError('Account for this user already exist');
    }

    const user = await this.accountsRepository.create({
      idUser,
      balance,
      withdrawDailyLimit,
      active,
      typeAccount,
    });

    return user;
  }
}

export default CreateAccountService;
