import { getRepository, Repository } from 'typeorm';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';

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
}

export default TransactionsRepository;
