interface ICurrencyProvider {
    subtract(money: string, secondMoney: string): string;
    add(money: string, secondMoney: string): string;
    isLessThan(money: string, secondMoney: string): boolean;
    format(money: string): string;
}

export default ICurrencyProvider;
