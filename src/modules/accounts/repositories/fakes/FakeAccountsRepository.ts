import { v4 } from 'uuid';

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import ICreateAccountDTO from '@modules/accounts/dtos/ICreateAccountDTO';

import Account from '../../infra/typeorm/entities/Account';

class FakeAccountsRepository implements IAccountsRepository {
    private accounts: Account[] = [];

    public async findById(id: string): Promise<Account | undefined> {
      const findAccount = this.accounts.find((account) => account.id === id);

      return findAccount;
    }

    public async findByIdOnlyActive(idUser: string): Promise<Account | undefined> {
      const findAccount = this.accounts.find((account) => account.id === idUser && account.active === true);

      return findAccount;
    }

    public async findByIdUser(idUser: string): Promise<Account | undefined> {
      const findAccount = this.accounts.find((account) => account.idUser === idUser);

      return findAccount;
    }

    public async create(accountData: ICreateAccountDTO): Promise<Account> {
      const account = new Account();

      Object.assign(account, { id: v4() }, accountData);

      this.accounts.push(account);

      return account;
    }

    public async save(account: Account): Promise<Account> {
      const findIndex = this.accounts.findIndex(
        (findAccount) => findAccount.id === account.id,
      );

      this.accounts[findIndex] = account;

      return account;
    }

    public async blockAccount(idAccount: string): Promise<number> {
      const findAccount = this.accounts.find((account) => account.id === idAccount);

      if (findAccount) {
        findAccount.active = false;
        return 1;
      }

      return 0;
    }

    public async withdraw(accountParam: Account, value: string): Promise<Account> {
      const findAccount = this.accounts.find((account) => account.id === accountParam.id);

      if (findAccount) {
        findAccount.balance = value;
        return findAccount;
      }

      return findAccount ?? accountParam;
    }

    public async deposit(accountParam: Account, value: string): Promise<Account> {
      const findAccount = this.accounts.find((account) => account.id === accountParam.id);

      if (findAccount) {
        findAccount.balance = value;
        return findAccount;
      }

      return findAccount ?? accountParam;
    }
}

export default FakeAccountsRepository;
