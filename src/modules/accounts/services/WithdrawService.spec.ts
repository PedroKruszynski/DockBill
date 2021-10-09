import AppError from '@shared/errors/AppError';

import FakeTransactionsRepository from '@modules/transactions/repositories/fakes/FakeTransactionsRepository';
import FakeCurrencyProvider from '@shared/container/providers/CurrencyProvider/fakes/FakeCurrencyProvider';
import FakeAccountsRepository from '../repositories/fakes/FakeAccountsRepository';
import WithdrawService from './WithdrawService';
import CreateAccountService from './CreateAccountService';

describe('WithdrawService', () => {
  it('should be able to make a withdraw money', async () => {
    const fakeAccountRepository = new FakeAccountsRepository();
    const fakeTransactionsRepository = new FakeTransactionsRepository();
    const fakeCurrencyProvider = new FakeCurrencyProvider();

    const withdrawService = new WithdrawService(
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

    const withdraw = await withdrawService.execute({
      idAccount: account.id,
      value: '10',
    });

    expect(withdraw).toHaveProperty('id');
  });

  it('should not be able to make a withdraw money of a account if not exist account', async () => {
    const fakeAccountRepository = new FakeAccountsRepository();
    const fakeTransactionsRepository = new FakeTransactionsRepository();
    const fakeCurrencyProvider = new FakeCurrencyProvider();

    const withdrawService = new WithdrawService(
      fakeAccountRepository,
      fakeTransactionsRepository,
      fakeCurrencyProvider,
    );

    expect(
      withdrawService.execute({
        idAccount: 'fakeId',
        value: '10',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to make a withdraw money of a account if not have enought balance', async () => {
    const fakeAccountRepository = new FakeAccountsRepository();
    const fakeTransactionsRepository = new FakeTransactionsRepository();
    const fakeCurrencyProvider = new FakeCurrencyProvider();

    const withdrawService = new WithdrawService(
      fakeAccountRepository,
      fakeTransactionsRepository,
      fakeCurrencyProvider,
    );

    const createAccount = new CreateAccountService(
      fakeAccountRepository,
    );

    const account = await createAccount.execute({
      idUser: '2b0b152c-5f84-43a2-95ba-95fda119273b',
      balance: '5',
      withdrawDailyLimit: '500',
      active: true,
      typeAccount: 1,
    });

    expect(
      withdrawService.execute({
        idAccount: account.id,
        value: '10',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
