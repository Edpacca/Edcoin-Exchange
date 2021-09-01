import { Button, Slider } from "@material-ui/core";
import { OrdersBook } from "./OrdersBook";
import { useState, ChangeEvent } from "react";
import { DirectionType } from "../../../models/directionType";
import { useAppSelector } from '../../../app/hooks';
import { RootState } from "../../../app/store";
import { Order } from "../../../models/order";
import { DropDownSelect } from "../../generic/DropdownSelect";
import { GetAllAccountTypes, AccountType } from '../../../models/accountType';
import { rangeFilter } from "../../../utilities/utilities";

export function OrderBrowser(props: {orderSelector: (state:RootState)=>Order[]}) {

    const stateOrders: Order[] = useAppSelector(props.orderSelector);
    const [orders, setOrders] = useState(stateOrders);
    const [price, setPrice] = useState<number[]>([0, 100]);
    const [quantity, setQuantity] = useState<number[]>([0, 100]);
    const [directionTypeFilter, setDirectionTypeFilter] = useState<string>(DirectionType.None);
    const [accountTypeFilter, setAccountTypeFilter] = useState<string>("All");
    const selectAccount: string[] = [ "All" ].concat(GetAllAccountTypes());

    const filterPrice = (range: number[]) => {
        setPrice(range);
        setOrders(stateOrders.filter(
            order => rangeFilter(
                order.price,
                range[0],
                range[1])));
    }

    const filterQuantity = (range: number[]) => {
        setQuantity(range);
        setOrders(stateOrders.filter(
            order => rangeFilter(
                order.quantity,
                range[0],
                range[1])));
    }

    const handleSliderChange = (event: ChangeEvent<{}>, newValue: number | number[], filterFunc: (range: number[]) => void) => {
        filterFunc(newValue as number[]);
    }

    const handleDropDownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "All") {
            setOrders(stateOrders);
            setAccountTypeFilter(event.target.value);
        } else {
            const account: AccountType = event.target.value + "-EDC" as AccountType;
            setOrders(stateOrders.filter(order => order.account === account));
            setAccountTypeFilter(account);
        }
    }

    const handleDirectionTypeFilter = (direction: DirectionType) => {
        setDirectionTypeFilter(direction);
        if (direction === DirectionType.None) {
            setOrders(stateOrders);
        } else {
            setOrders(stateOrders.filter(order => order.direction === direction));
        }
    }

    let searchCriteria = 
        `${accountTypeFilter === "All" ? "" : accountTypeFilter + ":"} ${directionTypeFilter ? directionTypeFilter : "all"} orders (${orders.length})`;

        return (
        <div>
            <br/>
            <h4>ACCOUNT</h4>
            <DropDownSelect 
                values={selectAccount}
                id={"selectAccount"}
                onChange={e => handleDropDownChange(e)}/>
            <div className="slider">
                <h4>PRICE</h4>
                <Slider 
                value={price}
                step={0.1}
                onChange={(event, value) => handleSliderChange(event, value, filterPrice)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                />
                <h4>QUANTITY</h4>
                <Slider
                value={quantity}
                step={1}
                onChange={(event, value) => handleSliderChange(event, value, filterQuantity)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                />
            </div>
            <div>
                <Button onClick={() => handleDirectionTypeFilter(DirectionType.None) }>All</Button>
                <Button onClick={() => handleDirectionTypeFilter(DirectionType.Buy)}>Buy</Button>
                <Button onClick={() => handleDirectionTypeFilter(DirectionType.Sell)}>Sell</Button>
            </div>
            <br/>
            <p>Searching {searchCriteria}</p>
            <OrdersBook orders={orders}/>
            <br/>
        </div>
    )
}