export interface UserAccount {
    readonly id: string,
    readonly name: string,
    readonly balanceCrypto: number;
    readonly balanceCash: number,
}