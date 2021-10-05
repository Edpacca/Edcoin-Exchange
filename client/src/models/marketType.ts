export enum MarketType {
    All = 'ALL',
    USD = 'USD',
    EUR = 'EUR',
    JPY = 'JPY',
    GBP = 'GBP',
    CAD = 'CAD',
    CHF = 'CHF',
}

export const GetAllMarketTypes = (): string[] => {
    return Object.keys(MarketType);
}