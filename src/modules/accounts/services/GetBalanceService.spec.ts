import AppError from '@shared/errors/AppError';

import FakeAccountsRepository from '../repositories/fakes/FakeAccountsRepository';
import GetBalanceService from './GetBalanceService';
import CreateAccountService from './CreateAccountService';

describe('GetBalance', () => {
  it('should be able to get the balance of a account', async () => {
    const fakeAccountRepository = new FakeAccountsRepository();

    const getBalance = new GetBalanceService(
      fakeAccountRepository,
    );

    const createAccount = new CreateAccountService(
      fakeAccountRepository,
    );

    const account = await createAccount.execute({
      idUser: '2b0b152c-5f84-43a2-95ba-95fda119273b',
      balance: '500',
      withdrawDailyLimit: '500',
      active: true,
      typeAccount: 1,
    });

    const blockAccount = await getBalance.execute({
      idAccount: account.id,
    });

    expect(blockAccount).toHaveProperty('balance');
  });

  it('should not be able to get the balance of a account if not exist account', async () => {
    const fakeAccountRepository = new FakeAccountsRepository();

    const getBalance = new GetBalanceService(
      fakeAccountRepository,
    );

    expect(
      getBalance.execute({
        idAccount: 'fakeId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
