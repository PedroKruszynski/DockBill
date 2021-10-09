import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAccountsRepository from '../repositories/IAccountsRepository';

interface IRequest {
  idAccount: string;
}

interface IReturn {
  balance: string;
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
    const checkAccountExist = await this.accountsRepository.findByIdOnlyActive(idAccount);

    if (!checkAccountExist) {
      throw new AppError("Account don't exist or are blocked");
    }

    return {
      balance: checkAccountExist.balance,
    };
  }
}

export default GetBalanceService;
