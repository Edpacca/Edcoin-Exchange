import { FilterState } from '../features/filters/filterSlice';
import { filterTrades } from '../features/trades/tradeSlice';
import { MarketType } from '../models/marketType';
import { ExchangeType } from '../models/exchangeType';
import { Trade } from '../models/trade';

describe('tradeslice filter function', () => {
    const otherData = { id: "0", buyOrderId: "0", sellOrderId: "0", buyUserId: "0", sellUserId: "0", time: new Date() }

    const trade0: Trade = { market: MarketType.CAD, price: 10, quantity: 60, ...otherData }
    const trade1: Trade = { market: MarketType.CAD, price: 20, quantity: 70, ...otherData }
    const trade2: Trade = { market: MarketType.USD, price: 60, quantity: 10, ...otherData }
    const trade3: Trade = { market: MarketType.USD, price: 70, quantity: 20, ...otherData }
    
    const trades = [ trade0, trade1, trade2, trade3 ];

    // * wide price and quantity ranges
    describe('no filter conditions*', () => {
        it('should return the original list of orders', () => {
            const filtersAll: FilterState = {
                directionFilter: ExchangeType.All,
                accountFilter: MarketType.All,
                priceFilter: [0, 100],
                quantityFilter: [0, 100]
            }
            expect(filterTrades(trades, filtersAll)).toEqual(trades);
        });
    });

    describe('filter by account type', () => {
        it('should only return ordefs with CFH account types', () => {
            const filtersCAD: FilterState = {
                directionFilter: ExchangeType.All,
                accountFilter: MarketType.CAD,
                priceFilter: [0, 100],
                quantityFilter: [0, 100]
            }
            expect(filterTrades(trades, filtersCAD)).toEqual([trade0, trade1]);
        });
    })

    describe('filter by price range', () => {
        it('should only return orders within the specified price range', () => {
            const filtersPriceLow: FilterState = {
                directionFilter: ExchangeType.All,
                accountFilter: MarketType.All,
                priceFilter: [0, 50],
                quantityFilter: [0, 100]
            }
            expect(filterTrades(trades, filtersPriceLow)).toEqual([trade0, trade1]);
        });
        it('should only return orders within the specified price range', () => {
            const filtersPriceHigh: FilterState = {
                directionFilter: ExchangeType.All,
                accountFilter: MarketType.All,
                priceFilter: [50, 100],
                quantityFilter: [0, 100]
            }
            expect(filterTrades(trades, filtersPriceHigh)).toEqual([trade2, trade3]);
        });
    })

    describe('filter by quantity range', () => {
        it('should only return orders within the specified quantity range', () => {
            const filtersQuantityLow: FilterState = {
                directionFilter: ExchangeType.All,
                accountFilter: MarketType.All,
                priceFilter: [0, 100],
                quantityFilter: [0, 50]
            }
            expect(filterTrades(trades, filtersQuantityLow)).toEqual([trade2, trade3]);

        });

        it('should only return orders within the specified quantity range', () => {
            const filtersQuantityHigh: FilterState = {
                directionFilter: ExchangeType.All,
                accountFilter: MarketType.All,
                priceFilter: [0, 100],
                quantityFilter: [50, 100]
            }
            expect(filterTrades(trades, filtersQuantityHigh)).toEqual([trade0, trade1]);
        });
    })

    describe('combinations of different filters', () => {
        it('should filter by price and quantity', () => {
            const filtersPriceQuantity: FilterState = {
                directionFilter: ExchangeType.All,
                accountFilter: MarketType.All,
                priceFilter: [0, 15],
                quantityFilter: [50, 70]
            }
            expect(filterTrades(trades, filtersPriceQuantity)).toEqual([trade0]);
        });
        it('should filter by price, quantity and account type', () => {
            const filtersPriceQuantityAccount: FilterState = {
                directionFilter: ExchangeType.All,
                accountFilter: MarketType.USD,
                priceFilter: [65, 75],
                quantityFilter: [15, 25]
            }
            expect(filterTrades(trades, filtersPriceQuantityAccount)).toEqual([trade3]);
        });
    });
});
