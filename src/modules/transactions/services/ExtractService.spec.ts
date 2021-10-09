import AppError from '@shared/errors/AppError';

import FakeCurrencyProvider from '@shared/container/providers/CurrencyProvider/fakes/FakeCurrencyProvider';
import FakeAccountsRepository from '@modules/accounts/repositories/fakes/FakeAccountsRepository';
import CreateAccountService from '@modules/accounts/services/CreateAccountService';
import DepositService from '@modules/accounts/services/DepositService';
import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';
import ExtractService from './ExtractService';
import Transaction from '../infra/typeorm/entities/Transaction';

describe('ExtractService', () => {
  it('should be able to make a withdraw money', async () => {
    const fakeAccountRepository = new FakeAccountsRepository();
    const fakeTransactionsRepository = new FakeTransactionsRepository();
    const fakeCurrencyProvider = new FakeCurrencyProvider();

    const extractService = new ExtractService(
      fakeTransactionsRepository,
      fakeAccountRepository,
    );

    const createAccount = new CreateAccountService(
      fakeAccountRepository,
    );

    const depositService = new DepositService(
      fakeAccountRepository,
      fakeTransactionsRepository,
      fakeCurrencyProvider,
    );

    const account = await createAccount.execute({
      idUser: '2b0b152c-5f84-43a2-95ba-95fda119273b',
      balance: '500',
      withdrawDailyLimit: '500',
      active: true,
      typeAccount: 1,
    });

    await depositService.execute({
      idAccount: account.id,
      value: '10',
    });

    await depositService.execute({
      idAccount: account.id,
      value: '100',
    });

    const extract = await extractService.execute({
      idAccount: account.id,
      period: {
        periodBegin: undefined,
        periodEnd: undefined,
      },
    });

    extract.forEach((transaction) => {
      expect(transaction).toBeInstanceOf(Transaction);
    });
  });

  it('should not be able to generate extract for account existing', async () => {
    const fakeAccountRepository = new FakeAccountsRepository();
    const fakeTransactionsRepository = new FakeTransactionsRepository();

    const extractService = new ExtractService(
      fakeTransactionsRepository,
      fakeAccountRepository,
    );

    expect(
      extractService.execute({
        idAccount: 'fakeId',
        period: {
          periodBegin: undefined,
          periodEnd: undefined,
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
