import AppError from '@shared/errors/AppError';

import FakeAccountsRepository from '../repositories/fakes/FakeAccountsRepository';
import CreateAccountService from './CreateAccountService';

describe('CreateAccount', () => {
  it('should be able to create a new account', async () => {
    const fakeAccountRepository = new FakeAccountsRepository();

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

    expect(account).toHaveProperty('id');
  });

  it('should not be able to create a new account if exist a account for that user', async () => {
    const fakeAccountRepository = new FakeAccountsRepository();

    const createAccount = new CreateAccountService(
      fakeAccountRepository,
    );

    await createAccount.execute({
      idUser: '2b0b152c-5f84-43a2-95ba-95fda119273b',
      balance: '500',
      withdrawDailyLimit: '500',
      active: true,
      typeAccount: 1,
    });

    expect(
      createAccount.execute({
        idUser: '2b0b152c-5f84-43a2-95ba-95fda119273b',
        balance: '500',
        withdrawDailyLimit: '500',
        active: true,
        typeAccount: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
