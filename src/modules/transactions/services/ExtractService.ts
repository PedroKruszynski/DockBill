import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import Transaction from '../infra/typeorm/entities/Transaction';
import IExtractDTO from '../dtos/IExtractDTO';

@injectable()
class ExtractService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {
    // do nothing.
  }

  public async execute({
    idAccount, period,
  }: IExtractDTO): Promise<Transaction[]> {
    const checkAccountExist = await this.accountsRepository.findById(idAccount);

    if (!checkAccountExist) {
      throw new AppError("Account don't exist or are blocked");
    }

    const transactions = await this.transactionsRepository.extract({ idAccount, period });

    return transactions;
  }
}

export default ExtractService;
