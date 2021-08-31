import { Button, Slider } from "@material-ui/core";
import { PrivateOrders } from "./PrivateOrders";
import { useState } from "react";
import { DirectionType } from "../../models/directionType";
import { selectOrders } from "../../app/orderSlice";
import { useAppSelector } from '../../app/hooks';

export function OrderBrowser() {

    const stateOrders = useAppSelector(selectOrders);
    const [orders, setOrders] = useState(stateOrders);
    const [price, setPrice] = useState<number[]>([0, 100]);
    const [quantity, setQuantity] = useState<number[]>([1, 100]);
    const [searchType, setSearchType] = useState<string>('all');

    const handlePriceChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
        const range = newValue as number[]
        setPrice(range);
        setOrders(stateOrders.filter(
            order => rangeFilter(
                order.price,
                range[0],
                range[1])));
    };

    const handleQuantityChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
        const range = newValue as number[]
        setQuantity(range as number[]);
        setOrders(stateOrders.filter(
            order => rangeFilter(
                order.quantity,
                range[0],
                range[1])));
    };

    let searchCriteria = `${searchType ? searchType : "all"} orders (${orders.length})`;

        return (
        <div>
            <h2>MY ORDERS</h2>
            <hr color="grey"/>
            <div>
                <h3>PRICE</h3>
                <Slider className="slider"
                value={price}
                step={0.1}
                onChange={handlePriceChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                />
                <h3>QUANTITY</h3>
                <Slider className="slider"
                value={quantity}
                step={1}
                onChange={handleQuantityChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                />
            </div>
            <div>
                <Button onClick={() => setSearchType(DirectionType.None)}>All</Button>
                <Button onClick={() => setSearchType(DirectionType.Buy)}>Buy</Button>
                <Button onClick={() => setSearchType(DirectionType.Sell)}>Sell</Button>
            </div>
            <p>Searching {searchCriteria}</p>
            <PrivateOrders orders={orders}/>
        </div>
    )
}

const rangeFilter = (x: number, min: number, max: number): boolean => {
    return x >= min && x <= max
}