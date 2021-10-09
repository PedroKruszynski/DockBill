import {
  getRepository, Repository, Between, MoreThanOrEqual, LessThanOrEqual, IsNull, Not,
} from 'typeorm';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import IExtractDTO from '@modules/transactions/dtos/IExtractDTO';

import Transaction from '../entities/Transaction';

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async findByIdAccount(idAccount: string): Promise<Transaction[] | undefined> {
    const transactions = await this.ormRepository.find({ where: { idAccount } });

    return transactions;
  }

  public async create(transactionData: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create(transactionData);
    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async save(transaction: Transaction): Promise<Transaction> {
    return this.ormRepository.save(transaction);
  }

  public async extract({
    idAccount, period,
  }: IExtractDTO): Promise<Transaction[]> {
    const createdAt = (begin: string | undefined, end: string | undefined) => {
      if (begin && end) {
        return Between(begin, end);
      }
      if (begin) {
        return MoreThanOrEqual(begin);
      }
      if (end) {
        return LessThanOrEqual(end);
      }
      return Not(IsNull());
    };

    const transactions = await this.ormRepository.find({
      where: {
        idAccount,
        created_at: createdAt(period.periodBegin, period.periodEnd),
      },
    });

    return transactions;
  }
}

export default TransactionsRepository;
