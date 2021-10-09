import AppError from '@shared/errors/AppError';

import FakeAccountsRepository from '../repositories/fakes/FakeAccountsRepository';
import BlockAccountService from './BlockAccountService';
import CreateAccountService from './CreateAccountService';

describe('BlockAccount', () => {
  it('should be able to block a account', async () => {
    const fakeAccountRepository = new FakeAccountsRepository();

    const BlockAccount = new BlockAccountService(
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

    const blockAccount = await BlockAccount.execute({
      idAccount: account.id,
    });

    expect(blockAccount).toEqual({
      message: 'Account blocked with success',
    });
  });

  it('should not be able to block a account if not exist account', async () => {
    const fakeAccountRepository = new FakeAccountsRepository();

    const BlockAccount = new BlockAccountService(
      fakeAccountRepository,
    );

    expect(
      BlockAccount.execute({
        idAccount: 'fakeId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
