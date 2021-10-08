import currency from 'currency.js';
import ICurrencyProvider from '../models/ICurrencyProvider';

class CurrencyProvider implements ICurrencyProvider {
  public subtract(money: string, secondMoney: string): string {
    return currency(money).subtract(secondMoney).format();
  }

  public add(money: string, secondMoney: string): string {
    return currency(money).add(secondMoney).format();
  }

  public isLessThan(money: string, secondMoney: string): boolean {
    const firstCurrency = currency(money);
    const secondCurrency = currency(secondMoney);

    return firstCurrency.value < secondCurrency.value;
  }

  public format(money: string): string {
    return currency(money).format();
  }
}

export default CurrencyProvider;
