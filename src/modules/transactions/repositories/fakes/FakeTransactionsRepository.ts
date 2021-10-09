import { v4 } from 'uuid';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import IExtractDTO from '@modules/transactions/dtos/IExtractDTO';

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

    public async extract({
      idAccount, period,
    }: IExtractDTO): Promise<Transaction[]> {
      const createdAt = (begin: string | undefined, end: string | undefined, created_at: Date): boolean => {
        if (begin && end) {
          const beginDate = new Date(begin);
          const endDate = new Date(end);
          return created_at > beginDate && created_at < endDate;
        }
        if (begin) {
          const beginDate = new Date(begin);
          return created_at > beginDate;
        }
        if (end) {
          const endDate = new Date(end);
          return created_at < endDate;
        }
        return !undefined;
      };

      const transactions = this.transactions.filter(
        (transaction) => transaction.idAccount === idAccount
            && createdAt(period.periodBegin, period.periodEnd, transaction.created_at),
      );

      return transactions;
    }
}

export default FakeTransactionsRepository;
