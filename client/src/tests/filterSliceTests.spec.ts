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
import { AccountType } from '../models/accountType';
import { DirectionType } from '../models/directionType';

test('should return initial state', () => {
    expect(reducer(undefined, {type: ""})).toEqual(
        {
            public: {
                directionFilter: DirectionType.All,
                accountFilter: AccountType.All,
                priceFilter: [0, 100],
                quantityFilter: [0, 100]
            },
            private: {
                directionFilter: DirectionType.All,
                accountFilter: AccountType.All,
                priceFilter: [0, 100],
                quantityFilter: [0, 100]
            }
        });
});

test('it should handle a change in the public direction filter', () => {
    expect(reducer(undefined,directionTypeChangedPublic(DirectionType.Buy)))
    .toEqual(        {
        public: {
            directionFilter: DirectionType.Buy,
            accountFilter: AccountType.All,
            priceFilter: [0, 100],
            quantityFilter: [0, 100]
        },
        private: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.All,
            priceFilter: [0, 100],
            quantityFilter: [0, 100]
        }
    });
});

test('it should handle a change in the prviate direction filter', () => {
    expect(reducer(undefined,directionTypeChangedPrivate(DirectionType.Buy)))
    .toEqual(        {
        public: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.All,
            priceFilter: [0, 100],
            quantityFilter: [0, 100]
        },
        private: {
            directionFilter: DirectionType.Buy,
            accountFilter: AccountType.All,
            priceFilter: [0, 100],
            quantityFilter: [0, 100]
        }
    });
});

test('it should handle a change in the public account filter', () => {
    expect(reducer(undefined,accountFilterChangedPublic(AccountType.CHF)))
    .toEqual(        {
        public: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.CHF,
            priceFilter: [0, 100],
            quantityFilter: [0, 100]
        },
        private: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.All,
            priceFilter: [0, 100],
            quantityFilter: [0, 100]
        }
    });
});

test('it should handle a change in the public account filter', () => {
    expect(reducer(undefined,accountFilterChangedPrivate(AccountType.CHF)))
    .toEqual(        {
        public: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.All,
            priceFilter: [0, 100],
            quantityFilter: [0, 100]
        },
        private: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.CHF,
            priceFilter: [0, 100],
            quantityFilter: [0, 100]
        }
    });
});


test('it should handle a change in the public price filter', () => {
    expect(reducer(undefined,priceFilterChangedPublic([20, 80])))
    .toEqual(        {
        public: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.All,
            priceFilter: [20, 80],
            quantityFilter: [0, 100]
        },
        private: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.All,
            priceFilter: [0, 100],
            quantityFilter: [0, 100]
        }
    });
});

test('it should handle a change in the private price filter', () => {
    expect(reducer(undefined,priceFilterChangedPrivate([20, 80])))
    .toEqual(        {
        public: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.All,
            priceFilter: [0, 100],
            quantityFilter: [0, 100]
        },
        private: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.All,
            priceFilter: [20, 80],
            quantityFilter: [0, 100]
        }
    });
});

test('it should handle a change in the public quantity filter', () => {
    expect(reducer(undefined,quantityFilterChangedPublic([30, 55])))
    .toEqual({
        public: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.All,
            priceFilter: [0, 100],
            quantityFilter: [30, 55]
        },
        private: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.All,
            priceFilter: [0, 100],
            quantityFilter: [0, 100]
        }
    });
});

test('it should handle a change in the private quantity filter', () => {
    expect(reducer(undefined,quantityFilterChangedPrivate([30, 55])))
    .toEqual({
        public: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.All,
            priceFilter: [0, 100],
            quantityFilter: [0, 100]
        },
        private: {
            directionFilter: DirectionType.All,
            accountFilter: AccountType.All,
            priceFilter: [0, 100],
            quantityFilter: [30, 55]
        }
    });
});