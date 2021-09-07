export enum AccountType {
    All = 'ALL',
    USD = 'USD-EDC',
    EUR = 'EUR-EDC',
    JPY = 'JPY-EDC',
    GBP = 'GBP-EDC',
    CAD = 'CAD-EDC',
    CHF = 'CHF-EDC',
}

export const GetAllAccountTypes = (): string[] => {
    return Object.keys(AccountType);
}