import ICreateAccountDTO from '../dtos/ICreateAccountDTO';
import Account from '../infra/typeorm/entities/Account';

interface IAccountsRepository {
    findById(id: string): Promise<Account | undefined>;
    findByIdUser(idUser: string): Promise<Account | undefined>;
    blockAccount(idAccount: string): Promise<number>;
    create(data: ICreateAccountDTO): Promise<Account>;
    save(user: Account): Promise<Account>;
}

export default IAccountsRepository;
