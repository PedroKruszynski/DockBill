import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import Transaction from '../infra/typeorm/entities/Transaction';
import ExtractDto from '../dtos/IExtractDTO';

interface ITransactionsRepository {
  findByIdAccount(idAccount: string): Promise<Transaction[] | undefined>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  save(user: Transaction): Promise<Transaction>;
  extract({ idAccount, period }: ExtractDto): Promise<Transaction[]>;
}

export default ITransactionsRepository;
