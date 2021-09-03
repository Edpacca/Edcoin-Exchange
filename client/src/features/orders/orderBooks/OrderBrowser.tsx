import { Button, Slider } from "@material-ui/core";
import { OrdersBook } from "./OrdersBook";
import { useState, ChangeEvent } from "react";
import { DirectionType } from "../../../models/directionType";
import { Order } from "../../../models/order";
import { DropDownSelect } from "../../generic/DropdownSelect";
import { GetAllAccountTypes, AccountType } from '../../../models/accountType';
export interface FilterDispatchProps {
    filterPrice: (range: number[]) => void;
    filterQuantity: (range: number[]) => void;
    changeAccountType: (account: AccountType) => void;
    changeDirectionType:(direction: DirectionType) => void;
}

export function OrderBrowser(props: {orders: Order[], dispatches: FilterDispatchProps}) {

    const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
    const [quantityRange, setQuantityRange] = useState<number[]>([0, 100]);
    const [directionTypeFilter, setDirectionTypeFilter] = useState<DirectionType>(DirectionType.All);
    const [accountTypeFilter, setAccountTypeFilter] = useState<AccountType>(AccountType.All);
    const selectAccount: string[] = GetAllAccountTypes();
    
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
            setAccountTypeFilter(AccountType.All);
        } else {
            const account: AccountType = event.target.value + "-EDC" as AccountType;
            props.dispatches.changeAccountType(account);
            setAccountTypeFilter(account);
        }
    }

    const handleDirectionTypeFilter = (direction: DirectionType) => {
        setDirectionTypeFilter(direction);
        props.dispatches.changeDirectionType(direction);
    }

    let searchCriteria = 
        `${accountTypeFilter === AccountType.All ? "" : `${accountTypeFilter}:`} ${directionTypeFilter} orders (${props.orders.length})`;

        return (
        <div>
            <br/>
            <h4>ACCOUNT</h4>
            <DropDownSelect 
                values={selectAccount}
                id={"selectAccount"}
                onChange={handleDropDownChange}/>
            <div className="slider">
                <h4>PRICE</h4>
                <Slider 
                value={priceRange}
                step={0.1}
                onChange={(event, value) => handleSliderChange(event, value, filterPrice)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                />
                <h4>QUANTITY</h4>
                <Slider
                value={quantityRange}
                step={1}
                onChange={(event, value) => handleSliderChange(event, value, filterQuantity)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                />
            </div>
            <div>
                <Button onClick={() => handleDirectionTypeFilter(DirectionType.All) }>All</Button>
                <Button onClick={() => handleDirectionTypeFilter(DirectionType.Buy)}>Buy</Button>
                <Button onClick={() => handleDirectionTypeFilter(DirectionType.Sell)}>Sell</Button>
            </div>
            <br/>
            <p>Searching {searchCriteria}</p>
            <OrdersBook orders={props.orders}/>
            <br/>
        </div>
    )
}