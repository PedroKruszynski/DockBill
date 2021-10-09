import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICurrencyProvider from '@shared/container/providers/CurrencyProvider/models/ICurrencyProvider';
import IAccountsRepository from '../repositories/IAccountsRepository';
import Account from '../infra/typeorm/entities/Account';

interface IRequest {
  idAccount: string;
  value: string;
}

@injectable()
class DepositService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CurrencyProvider')
    private currencyProvider: ICurrencyProvider,
  ) {
    // do nothing.
  }

  public async execute({ idAccount, value }: IRequest): Promise<Account> {
    const accountExist = await this.accountsRepository.findByIdOnlyActive(idAccount);

    if (!accountExist) {
      throw new AppError("Account don't exist or are blocked");
    }

    const account = await this.accountsRepository.deposit(
      accountExist, this.currencyProvider.add(accountExist.balance, value),
    );
    const transaction = await this.transactionsRepository.create({
      idAccount,
      value: this.currencyProvider.format(value),
    });
    await this.transactionsRepository.save(transaction);

    return account;
  }
}

export default DepositService;
