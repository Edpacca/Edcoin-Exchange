import { Button, Slider } from '@material-ui/core';
import { OrdersBook } from '../orders/orderBooks/OrdersBook';
import { useState, ChangeEvent } from 'react';
import { DirectionType } from '../../models/directionType';
import { Order } from '../../models/order';
import { DropDownSelect } from '../common/DropdownSelect';
import { GetAllAccountTypes, AccountType } from '../../models/accountType';
import { FilterState } from '../filters/filterSlice';
import { FilterDispatchProps } from '../../models/filterDispatchProps';
import { Trade } from '../../models/trade';
import { BookType } from '../../models/bookType';
import { TradesBook } from '../trades/TradesBook';

export function BooksBrowser(props: 
    {
        values: Order[] | Trade[],
        bookType: BookType,
        dispatches: FilterDispatchProps,
        filters: FilterState,
        isPrivate: boolean
    }) {

    // TODO Lags when passed directly to sliders from store
    const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
    const [quantityRange, setQuantityRange] = useState<number[]>([0, 100]);
    const selectAccount: string[] = GetAllAccountTypes();
    // const bookType = props.values ? props.values[0] instanceof Order ? BookType.Orders : BookType.Trades;
    
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
            props.dispatches.changeAccountType(AccountType.All);
        } else {
            const account: AccountType = event.target.value + "-EDC" as AccountType;
            props.dispatches.changeAccountType(account);
        }
    }

    const handleDirectionTypeFilter = (direction: DirectionType) => {
        props.dispatches.changeDirectionType(direction);
    }

    const searchCriteria = props.bookType === BookType.Orders 
        ?   `${props.filters.accountFilter === AccountType.All ? '' : `${props.filters.accountFilter}:`}\
             ${props.filters.directionFilter} orders (${props.values.length})`
        :   `${props.filters.accountFilter} trades (${props.values.length})`;

        return (
        <div>
            <br/>
            <h4>ACCOUNT</h4>
            <DropDownSelect 
                values={selectAccount}
                id={'selectAccount'}
                onChange={handleDropDownChange}/>
            <div className='slider'>
                <h4>PRICE {props.filters.priceFilter[0]} : {props.filters.priceFilter[1]}</h4>
                <Slider 
                value={priceRange}
                step={0.1}
                onChange={(event, value) => handleSliderChange(event, value, filterPrice)}
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
                />
                <h4>QUANTITY {props.filters.quantityFilter[0]} : {props.filters.quantityFilter[1]}</h4>
                <Slider
                value={quantityRange}
                step={1}
                onChange={(event, value) => handleSliderChange(event, value, filterQuantity)}
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
                />
            </div>
            {
                props.bookType === BookType.Orders &&
                <div>
                    <Button 
                        onClick={() => handleDirectionTypeFilter(DirectionType.All)}
                        color={props.filters.directionFilter === DirectionType.All ? 'primary' : 'default'}
                        variant={props.filters.directionFilter === DirectionType.All ? 'outlined' : 'text'}
                        >All
                    </Button>
                    <Button 
                        onClick={() => handleDirectionTypeFilter(DirectionType.Buy)}
                        color={props.filters.directionFilter === DirectionType.Buy ? 'primary' : 'default'}
                        variant={props.filters.directionFilter === DirectionType.Buy ? 'outlined' : 'text'}
                        >Buy
                    </Button>
                    <Button
                        onClick={() => handleDirectionTypeFilter(DirectionType.Sell)}
                        color={props.filters.directionFilter === DirectionType.Sell ? 'primary' : 'default'}
                        variant={props.filters.directionFilter === DirectionType.Sell ? 'outlined' : 'text'}
                        >Sell
                    </Button>
                </div>
            }
            <br/>
            <p>Searching {searchCriteria}</p>
            {
                props.bookType === BookType.Orders &&
                <OrdersBook orders={props.values as Order[]} isPrivate={props.isPrivate}/>
            }
            {
                props.bookType === BookType.Trades &&
                <TradesBook trades={props.values as Trade[]} isPrivate={props.isPrivate}/>
            }
            <br/>
        </div>
    )
}