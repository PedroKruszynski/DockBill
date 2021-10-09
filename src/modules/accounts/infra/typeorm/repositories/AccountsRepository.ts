import { getRepository, Repository } from 'typeorm';

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import ICreateAccountDTO from '@modules/accounts/dtos/ICreateAccountDTO';

import Account from '../entities/Account';

class AccountsRepository implements IAccountsRepository {
  private ormRepository: Repository<Account>;

  constructor() {
    this.ormRepository = getRepository(Account);
  }

  public async findById(id: string): Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({ id });

    return account;
  }

  public async findByIdOnlyActive(id: string): Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({ id, active: true });

    return account;
  }

  public async findByIdUser(idUser: string): Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({ where: { idUser } });

    return account;
  }

  public async create(accountData: ICreateAccountDTO): Promise<Account> {
    const account = this.ormRepository.create(accountData);
    await this.ormRepository.save(account);

    return account;
  }

  public async save(account: Account): Promise<Account> {
    return this.ormRepository.save(account);
  }

  public async blockAccount(idAccount: string): Promise<number> {
    const update = await this.ormRepository.update(
      idAccount,
      { active: false },
    );

    return update.affected as number;
  }

  public async withdraw(account: Account, value: string): Promise<Account> {
    await this.ormRepository.update(
      account.id,
      { balance: value },
    );

    const newAccount = await this.ormRepository.findOne({ id: account.id }) ?? account;

    return newAccount;
  }

  public async deposit(account: Account, value: string): Promise<Account> {
    await this.ormRepository.update(
      account.id,
      { balance: value },
    );

    const newAccount = await this.ormRepository.findOne({ id: account.id }) ?? account;

    return newAccount;
  }
}

export default AccountsRepository;
