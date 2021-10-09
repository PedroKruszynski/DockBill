import ICreateAccountDTO from '../dtos/ICreateAccountDTO';
import Account from '../infra/typeorm/entities/Account';

interface IAccountsRepository {
    findById(id: string): Promise<Account | undefined>;
    findByIdOnlyActive(id: string): Promise<Account | undefined>;
    findByIdUser(idUser: string): Promise<Account | undefined>;
    blockAccount(idAccount: string): Promise<number>;
    create(data: ICreateAccountDTO): Promise<Account>;
    save(account: Account): Promise<Account>;
    withdraw(account: Account, value: string): Promise<Account>;
    deposit(account: Account, value: string): Promise<Account>;
}

export default IAccountsRepository;
