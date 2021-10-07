import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import Transaction from '../infra/typeorm/entities/Transaction';

interface ITransactionsRepository {
  findByIdAccount(idAccount: string): Promise<Transaction[] | undefined>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  save(user: Transaction): Promise<Transaction>;
}

export default ITransactionsRepository;
