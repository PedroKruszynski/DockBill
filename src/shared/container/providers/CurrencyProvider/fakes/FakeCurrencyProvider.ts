import ICurrencyProvider from '../models/ICurrencyProvider';

class FakeCurrencyProvider implements ICurrencyProvider {
  public subtract(money: string, secondMoney: string): string {
    const sub = Number(money) - Number(secondMoney);

    return sub.toLocaleString();
  }

  add(money: string, secondMoney: string): string {
    const add = Number(money) + Number(secondMoney);

    return add.toLocaleString();
  }

  isLessThan(money: string, secondMoney: string): boolean {
    return Number(money) < Number(secondMoney);
  }

  format(money: string): string {
    return Number(money).toLocaleString();
  }
}

export default FakeCurrencyProvider;
