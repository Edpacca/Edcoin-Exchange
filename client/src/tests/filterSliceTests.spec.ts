import reducer, { 
    directionTypeChangedPublic,
    accountFilterChangedPublic,
    priceFilterChangedPublic,
    quantityFilterChangedPublic,
    directionTypeChangedPrivate,
    accountFilterChangedPrivate,
    priceFilterChangedPrivate,
    quantityFilterChangedPrivate,
} from '../features/filters/filterSlice';
import { MarketType } from '../models/marketType';
import { ExchangeType } from '../models/exchangeType';

describe('filterSlice reducer actions', () =>{

    it('should return the initial state when passed an empty action', () => {
        expect(reducer(undefined, {type: ""})).toEqual(
            {
                public: {
                    directionFilter: ExchangeType.All,
                    accountFilter: MarketType.All,
                    priceFilter: [0, 100],
                    quantityFilter: [0, 100]
                },
                private: {
                    directionFilter: ExchangeType.All,
                    accountFilter: MarketType.All,
                    priceFilter: [0, 100],
                    quantityFilter: [0, 100]
                }
            });
    });

    // Direction type
    describe(`on ${directionTypeChangedPublic.type}`, () => {
        it('should set the public direction type filter', () => {
            const testFilter = ExchangeType.Buy;
            const { public: { directionFilter } } = reducer(
                undefined,directionTypeChangedPublic(ExchangeType.Buy));

            expect(directionFilter).toEqual(testFilter);
        });
    });

    describe(`on ${directionTypeChangedPrivate.type}`, () => {
        it('should set the private direction type filter', () => {
            const testFilter = ExchangeType.Buy;
            const { private: { directionFilter } } = reducer(
                undefined,directionTypeChangedPrivate(ExchangeType.Buy));

            expect(directionFilter).toEqual(testFilter);
        });
    });

    // Account type
    describe(`on ${accountFilterChangedPublic.type}`, () => {
        it('should set the public account type filter', () => {
            const testFilter = MarketType.CHF;
            const { public: { accountFilter } } = reducer(
                undefined,accountFilterChangedPublic(MarketType.CHF));

            expect(accountFilter).toEqual(testFilter);
        });
    });

    describe(`on ${accountFilterChangedPrivate.type}`, () => {
        it('should set the private account type filter', () => {
            const testFilter = MarketType.CHF;
            const { private: { accountFilter } } = reducer(
                undefined,accountFilterChangedPrivate(MarketType.CHF));

            expect(accountFilter).toEqual(testFilter);
        });
    });

    // Price filter
    describe(`on ${priceFilterChangedPublic.type}`, () => {
        it('should set the public price range filter', () => {
            const testFilter = [10, 90];
            const { public: { priceFilter } } = reducer(
                undefined,priceFilterChangedPublic([10, 90]));

            expect(priceFilter).toEqual(testFilter);
        });
    });

    describe(`on ${priceFilterChangedPrivate.type}`, () => {
        it('should set the public price range filter', () => {
            const testFilter = [10, 90];
            const { private: { priceFilter } } = reducer(
                undefined,priceFilterChangedPrivate([10, 90]));

            expect(priceFilter).toEqual(testFilter);
        });
    });

    // Quantity filter
    describe(`on ${quantityFilterChangedPublic.type}`, () => {
        it('should set the public quantity range filter', () => {
            const testFilter = [10, 90];
            const { public: { quantityFilter } } = reducer(
                undefined,quantityFilterChangedPublic([10, 90]));

            expect(quantityFilter).toEqual(testFilter);
        });
    });

    describe(`on ${quantityFilterChangedPrivate.type}`, () => {
        it('should set the public quantity range filter', () => {
            const testFilter = [10, 90];
            const { private: { quantityFilter } } = reducer(
                undefined,quantityFilterChangedPrivate([10, 90]));

            expect(quantityFilter).toEqual(testFilter);
        });
    });
});