import './styles/book-browser.css';
import { Slider } from '@material-ui/core';
import { OrdersBook } from '../orders/orderBooks/OrdersBook';
import { useState, ChangeEvent } from 'react';
import { ExchangeType } from '../../models/exchangeType';
import { Order } from '../../models/order';
import { DropDownSelect } from '../common/DropdownSelect';
import { GetAllMarketTypes, MarketType } from '../../models/marketType';
import { FilterState } from '../filters/filterSlice';
import { FilterDispatchProps } from '../../models/filterDispatchProps';
import { Trade } from '../../models/trade';
import { BookType } from '../../models/bookType';
import { TradesBook } from '../trades/TradesBook';
import { DirectionFilterButtons } from '../common/DirectionFilterButtons';

export function BooksBrowser(props: 
    {
        values: Order[] | Trade[],
        bookType: BookType,
        dispatches: FilterDispatchProps,
        filters: FilterState,
        isPrivate: boolean
    }) {

    const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
    const [quantityRange, setQuantityRange] = useState<number[]>([0, 100]);
    const selectAccount: string[] = GetAllMarketTypes();
    const isOrderBook: boolean = props.bookType === BookType.Orders;
    
    const filterPrice = (range: number[]) => {
        setPriceRange(range);
        props.dispatches.filterPrice(range);
    }

    const filterQuantity = (range: number[]) => {
        setQuantityRange(range);
        props.dispatches.filterQuantity(range);
    }

    const handleSliderChange = (event: ChangeEvent<{}>, newValue: number | number[], filterFunc: (range: number[]) => void) => {
        if (typeof newValue === "number") return;
        filterFunc(newValue as number[]);
    }

    const handleDropDownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "All") {
            props.dispatches.changeAccountType(MarketType.All);
        } else {
            const account: MarketType = event.target.value as MarketType;
            props.dispatches.changeAccountType(account);
        }
    }

    const handleDirectionTypeFilter = (direction: ExchangeType) => {
        props.dispatches.changeDirectionType(direction);
    }

    const searchCriteria = props.bookType === BookType.Orders 
        ?   `${props.filters.accountFilter === MarketType.All ? '' : `${props.filters.accountFilter}:`}\
             ${props.filters.directionFilter} orders (${props.values.length})`
        :   `${props.filters.accountFilter} trades (${props.values.length})`;

        return (
        <div className="book-browser">
            <div>
                <div className={isOrderBook ? "filter-grid" : ""}>
                    <div>
                        <p className="unit-text">ACCOUNT</p>
                        <DropDownSelect 
                            values={selectAccount}
                            id={'selectAccount'}
                            onChange={handleDropDownChange}
                        />
                    </div>
                    {
                        isOrderBook &&
                        <div>
                            <p className="unit-text">DIRECTION</p>
                            <DirectionFilterButtons
                                directionFilter = { props.filters.directionFilter }
                                handleDirectionTypeFilter = {handleDirectionTypeFilter} />
                        </div>
                    }
                </div>
                    <div className="slider-filter">
                        <div className="text">PRICE</div>
                        <Slider
                                value={priceRange}
                                step={0.1}
                                onChange={(event, value) => handleSliderChange(event, value, filterPrice)}
                                valueLabelDisplay='auto'
                                aria-labelledby='range-slider'
                            />
                    </div>
                    <div className="slider-filter">
                        <div className="text">QUANTITY</div>
                        <Slider
                            value={quantityRange}
                            step={1}
                            onChange={(event, value) => handleSliderChange(event, value, filterQuantity)}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                        />
                    </div>

                
                <div className="search-text">
                    <p>Searching {searchCriteria}</p>
                    <p>
                    {
                        (priceRange[0] !== 0 || priceRange[1] !== 100) &&
                        <span>Price: {props.filters.priceFilter[0]} : {props.filters.priceFilter[1]}</span>
                    }
                    {
                        (quantityRange[0] !== 0 || quantityRange[1] !== 100) &&
                        <span>&nbsp; Quantity: {props.filters.quantityFilter[0]} : {props.filters.quantityFilter[1]}</span>
                    }
                    </p>
                </div>
            </div>
            <div className="data">
            {
                isOrderBook &&
                <OrdersBook orders={props.values as Order[]} isPrivate={props.isPrivate}/>
            }
            {
                props.bookType === BookType.Trades &&
                <TradesBook trades={props.values as Trade[]} isPrivate={props.isPrivate}/>
            }
            </div>
        </div>
    )
}