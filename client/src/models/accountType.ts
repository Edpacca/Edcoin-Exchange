export enum AccountType {
    USD = "USD-EDC",
    EUR = "EUR-EDC",
    JPY = "JPN-EDC",
    GBP = "GBP-EDC",
    CAD = "CAD-EDC",
    CHF = "CHF-EDC",
}

export const GetAllAccountTypes = (): string[] => {
    return Object.keys(AccountType);
}