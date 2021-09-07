import { FilterState } from "../features/filters/filterSlice";
import { filterOrders } from "../features/orders/orderSlice";
import { AccountType } from "../models/accountType";
import { DirectionType } from "../models/directionType";
import { Order } from "../models/order";

test('order filtering function to work correctly with filters', () => {
    
    const otherData = { time: new Date(), id: "0", userId: "0"}
    
    const order0: Order = { ...otherData,
        account: AccountType.CAD, direction: DirectionType.Buy, price: 10, quantity: 60 };
    const order1: Order = { ...otherData,
        account: AccountType.USD, direction: DirectionType.Buy, price: 20, quantity: 70 };
    const order2: Order = { ...otherData,
        account: AccountType.CAD, direction: DirectionType.Sell, price: 60, quantity: 10 };
    const order3: Order = { ...otherData,
        account: AccountType.USD, direction: DirectionType.Sell, price: 70, quantity: 20 };

    const orders = [ order0, order1, order2, order3 ];

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

    const filtersSell: FilterState = {
        directionFilter: DirectionType.Sell,
        accountFilter: AccountType.All,
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

    const filtersPriceQuantityAccountDirection: FilterState = {
        directionFilter: DirectionType.Sell,
        accountFilter: AccountType.USD,
        priceFilter: [65, 75],
        quantityFilter: [15, 25]
    }

    const filtersPriceQuantityAccountDirectionNone: FilterState = {
        directionFilter: DirectionType.Buy,
        accountFilter: AccountType.USD,
        priceFilter: [65, 75],
        quantityFilter: [15, 25]
    }

    expect(filterOrders(orders, filtersAll)).toEqual(orders);
    expect(filterOrders(orders, filtersCAD)).toEqual([order0, order2]);
    expect(filterOrders(orders, filtersSell)).toEqual([order2, order3]);
    expect(filterOrders(orders, filtersPriceLow)).toEqual([order0, order1]);
    expect(filterOrders(orders, filtersPriceHigh)).toEqual([order2, order3]);
    expect(filterOrders(orders, filtersQuantityLow)).toEqual([order2, order3]);
    expect(filterOrders(orders, filtersQuantityHigh)).toEqual([order0, order1]);
    expect(filterOrders(orders, filtersPriceQuantity)).toEqual([order0]);
    expect(filterOrders(orders, filtersPriceQuantityAccount)).toEqual([order3]);
    expect(filterOrders(orders, filtersPriceQuantityAccountDirection)).toEqual([order3]);
    expect(filterOrders(orders, filtersPriceQuantityAccountDirectionNone)).toEqual([]);

});