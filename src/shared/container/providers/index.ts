import { container } from 'tsyringe';

import ICurrencyProvider from './CurrencyProvider/models/ICurrencyProvider';
import CurrencyProvider from './CurrencyProvider/implementations/CurrencyProvider';

container.registerSingleton<ICurrencyProvider>(
  'CurrencyProvider',
  CurrencyProvider,
);
