import { FilterState } from "../features/filters/filterSlice";
import { filterOrders } from "../features/orders/orderSlice";
import { MarketType } from "../models/marketType";
import { ExchangeType } from "../models/exchangeType";
import { Order } from "../models/order";

describe('orderslice filter function', () => {

    const otherData = { time: new Date(), id: "0", userId: "0"}
    
    const order0: Order = { ...otherData,
        market: MarketType.CAD, exchange: ExchangeType.Buy, price: 10, quantity: 60 };
    const order1: Order = { ...otherData,
        market: MarketType.USD, exchange: ExchangeType.Buy, price: 20, quantity: 70 };
    const order2: Order = { ...otherData,
        market: MarketType.CAD, exchange: ExchangeType.Sell, price: 60, quantity: 10 };
    const order3: Order = { ...otherData,
        market: MarketType.USD, exchange: ExchangeType.Sell, price: 70, quantity: 20 };

    const orders = [ order0, order1, order2, order3 ];
  
    // * wide price and quantity ranges
    describe('no filter conditions*', () => {
        it('should return the original list of orders', () => {
            const filtersAll: FilterState = {
                directionFilter: ExchangeType.All,
                accountFilter: MarketType.All,
                priceFilter: [0, 100],
                quantityFilter: [0, 100]
            }
            expect(filterOrders(orders, filtersAll)).toEqual(orders);
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
            expect(filterOrders(orders, filtersCAD)).toEqual([order0, order2]);
        });
    })

    describe('filter by direction type', () => {
        it('should only return SELL orders', () => {
            const filtersSell: FilterState = {
                directionFilter: ExchangeType.Sell,
                accountFilter: MarketType.All,
                priceFilter: [0, 100],
                quantityFilter: [0, 100]
            }
            expect(filterOrders(orders, filtersSell)).toEqual([order2, order3]);
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
            expect(filterOrders(orders, filtersPriceLow)).toEqual([order0, order1]);
        });
        it('should only return orders within the specified price range', () => {
            const filtersPriceHigh: FilterState = {
                directionFilter: ExchangeType.All,
                accountFilter: MarketType.All,
                priceFilter: [50, 100],
                quantityFilter: [0, 100]
            }
            expect(filterOrders(orders, filtersPriceHigh)).toEqual([order2, order3]);
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
            expect(filterOrders(orders, filtersQuantityLow)).toEqual([order2, order3]);

        });

        it('should only return orders within the specified quantity range', () => {
            const filtersQuantityHigh: FilterState = {
                directionFilter: ExchangeType.All,
                accountFilter: MarketType.All,
                priceFilter: [0, 100],
                quantityFilter: [50, 100]
            }
            expect(filterOrders(orders, filtersQuantityHigh)).toEqual([order0, order1]);
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
            expect(filterOrders(orders, filtersPriceQuantity)).toEqual([order0]);
        });
        it('should filter by quantity and account type', () => {
            const filtersPriceQuantityAccount: FilterState = {
                directionFilter: ExchangeType.All,
                accountFilter: MarketType.USD,
                priceFilter: [65, 75],
                quantityFilter: [15, 25]
            }
            expect(filterOrders(orders, filtersPriceQuantityAccount)).toEqual([order3]);

        });
        it('should filter by quantity and account and direction type', () => {
            const filtersPriceQuantityAccountDirection: FilterState = {
                directionFilter: ExchangeType.Sell,
                accountFilter: MarketType.USD,
                priceFilter: [65, 75],
                quantityFilter: [15, 25]
            }
            expect(filterOrders(orders, filtersPriceQuantityAccountDirection)).toEqual([order3]);
        });
    });
});