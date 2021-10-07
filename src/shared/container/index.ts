import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import AccountsRepository from '@modules/accounts/infra/typeorm/repositories/AccountsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository,
);
