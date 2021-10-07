import { v4 } from 'uuid';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';

import Transaction from '../../infra/typeorm/entities/Transaction';

class FakeTransactionsRepository implements ITransactionsRepository {
    private transactions: Transaction[] = [];

    public async findByIdAccount(idAccount: string): Promise<Transaction[] | undefined> {
      const reduceTransactions = this.transactions.filter((transaction) => transaction.idAccount === idAccount);

      return reduceTransactions;
    }

    public async create(transactionData: ICreateTransactionDTO): Promise<Transaction> {
      const transaction = new Transaction();

      Object.assign(transaction, { id: v4() }, transactionData);

      this.transactions.push(transaction);

      return transaction;
    }

    public async save(transaction: Transaction): Promise<Transaction> {
      const findIndex = this.transactions.findIndex(
        (findTransaction) => findTransaction.id === transaction.id,
      );

      this.transactions[findIndex] = transaction;

      return transaction;
    }
}

export default FakeTransactionsRepository;
