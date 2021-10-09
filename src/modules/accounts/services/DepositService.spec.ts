import AppError from '@shared/errors/AppError';

import FakeTransactionsRepository from '@modules/transactions/repositories/fakes/FakeTransactionsRepository';
import FakeCurrencyProvider from '@shared/container/providers/CurrencyProvider/fakes/FakeCurrencyProvider';
import FakeAccountsRepository from '../repositories/fakes/FakeAccountsRepository';
import DepositService from './DepositService';
import CreateAccountService from './CreateAccountService';

describe('DepositService', () => {
  it('should be able to make a deposit', async () => {
    const fakeAccountRepository = new FakeAccountsRepository();
    const fakeTransactionsRepository = new FakeTransactionsRepository();
    const fakeCurrencyProvider = new FakeCurrencyProvider();

    const depositService = new DepositService(
      fakeAccountRepository,
      fakeTransactionsRepository,
      fakeCurrencyProvider,
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

    const deposit = await depositService.execute({
      idAccount: account.id,
      value: '10',
    });

    expect(deposit).toHaveProperty('id');
  });

  it('should not be able to make a deposit of a account if not exist account', async () => {
    const fakeAccountRepository = new FakeAccountsRepository();
    const fakeTransactionsRepository = new FakeTransactionsRepository();
    const fakeCurrencyProvider = new FakeCurrencyProvider();

    const depositService = new DepositService(
      fakeAccountRepository,
      fakeTransactionsRepository,
      fakeCurrencyProvider,
    );

    expect(
      depositService.execute({
        idAccount: 'fakeId',
        value: '10',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
