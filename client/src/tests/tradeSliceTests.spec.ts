import { FilterState } from '../features/filters/filterSlice';
import { filterTrades } from '../features/trades/tradeSlice';
import { AccountType } from '../models/accountType';
import { DirectionType } from '../models/directionType';
import { Trade } from '../models/trade';

test('trade filtering function to work correctly with specific filters', () => {
    const otherData = { id: "0", orderId1: "0", orderId2: "0", userId1: "0", userId2: "0", time: new Date() }

    const trade0: Trade = { account: AccountType.CAD, price: 10, quantity: 60, ...otherData }
    const trade1: Trade = { account: AccountType.CAD, price: 20, quantity: 70, ...otherData }
    const trade2: Trade = { account: AccountType.USD, price: 60, quantity: 10, ...otherData }
    const trade3: Trade = { account: AccountType.USD, price: 70, quantity: 20, ...otherData }
    
    const trades = [ trade0, trade1, trade2, trade3 ];

    const filtersAll: FilterState = {
        directionFilter: DirectionType.All,
        accountFilter: AccountType.All,
        priceFilter: [0, 100],
        quantityFilter: [0, 100]
    }

    const filtersCAD: FilterState = {
        directionFilter: DirectionType.All,
        accountFilter: AccountType.CAD,
        priceFilter: [0, 100],
        quantityFilter: [0, 100]
    }

    const filtersPriceLow: FilterState = {
        directionFilter: DirectionType.All,
        accountFilter: AccountType.All,
        priceFilter: [0, 50],
        quantityFilter: [0, 100]
    }

    const filtersPriceHigh: FilterState = {
        directionFilter: DirectionType.All,
        accountFilter: AccountType.All,
        priceFilter: [50, 100],
        quantityFilter: [0, 100]
    }

    const filtersQuantityLow: FilterState = {
        directionFilter: DirectionType.All,
        accountFilter: AccountType.All,
        priceFilter: [0, 100],
        quantityFilter: [0, 50]
    }

    const filtersQuantityHigh: FilterState = {
        directionFilter: DirectionType.All,
        accountFilter: AccountType.All,
        priceFilter: [0, 100],
        quantityFilter: [50, 100]
    }

    const filtersPriceQuantity: FilterState = {
        directionFilter: DirectionType.All,
        accountFilter: AccountType.All,
        priceFilter: [0, 15],
        quantityFilter: [50, 70]
    }

    const filtersPriceQuantityAccount: FilterState = {
        directionFilter: DirectionType.All,
        accountFilter: AccountType.USD,
        priceFilter: [65, 75],
        quantityFilter: [15, 25]
    }

    expect(filterTrades(trades, filtersAll)).toEqual(trades);
    expect(filterTrades(trades, filtersCAD)).toEqual([trade0, trade1]);
    expect(filterTrades(trades, filtersPriceLow)).toEqual([trade0, trade1]);
    expect(filterTrades(trades, filtersPriceHigh)).toEqual([trade2, trade3]);
    expect(filterTrades(trades, filtersQuantityLow)).toEqual([trade2, trade3]);
    expect(filterTrades(trades, filtersQuantityHigh)).toEqual([trade0, trade1]);
    expect(filterTrades(trades, filtersPriceQuantity)).toEqual([trade0]);
    expect(filterTrades(trades, filtersPriceQuantityAccount)).toEqual([trade3]);
});
