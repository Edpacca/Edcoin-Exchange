export interface UserAccount {
    readonly id: string,
    readonly name: string,
    balanceCrypto: number;
    balanceCash: number,
}