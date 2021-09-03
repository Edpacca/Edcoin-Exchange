export interface UserAccount {
    readonly id: string,
    readonly name: string,
    balance_crypto: number;
    balance_cash: number,
}