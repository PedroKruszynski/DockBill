import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAccountsRepository from '../repositories/IAccountsRepository';

interface IRequest {
  idAccount: string;
}

interface IReturn {
  balance: number;
}

@injectable()
class GetBalanceService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {
    // do nothing.
  }

  public async execute({
    idAccount,
  }: IRequest): Promise<IReturn> {
    const checkAccountExist = await this.accountsRepository.findById(idAccount);

    if (!checkAccountExist) {
      throw new AppError("Account don't exist");
    }

    return {
      balance: checkAccountExist.balance,
    };
  }
}

export default GetBalanceService;
