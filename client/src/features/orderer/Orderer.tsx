import { BuySellToggle } from './BuySellToggle';
import { Button } from '@material-ui/core';
import { Order } from '../../models/order'
import { DirectionType } from '../../models/directionType';
import { useState } from 'react';
import { Slider } from '@material-ui/core';
import { useDispatch } from 'react-redux';

export function OrderUI() {

    const [isBuying, setIsBuying] = useState<boolean>(true);
    const [price, setPrice] = useState<number>(50);
    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useDispatch();

    const setDirection = () => {
        setIsBuying(!isBuying);
    }

    const handleQuantityChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        if(Array.isArray(value)) return;
        setQuantity(value as number);
    }

    const handleSliderPriceChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        if(Array.isArray(value)) return;
        setPrice(value as number);
    }

    const submit = () => {
        const mockOrder: Order = {
            id: `testId-${price}-${new Date()}-aszkr032-c1-df12d`,
            orderTime: new Date(),
            account: 99,
            price: price,
            direction: isBuying 
                ? DirectionType.Buy 
                : DirectionType.Sell,
            quantity: quantity,
        }
        dispatch({type: "orders/orderCreated", payload: mockOrder});
    }

    const orderSummary: string = `${quantity} at $${price.toFixed(2)}`;
    const orderMessage: string = isBuying ? `BUY ${orderSummary}`: `SELL ${orderSummary}`;

    return (
        <div>
            <br/>
            <div className="slider">
                <div><h4>PRICE</h4></div>
                <Slider
                    defaultValue={15.00}
                    step={0.01}
                    min={0.00}
                    max={100}
                    value={price}
                    onChange={handleSliderPriceChange}
                />
            </div>
            <div className="slider">
            <div><h4>QUANTITY</h4></div>
                <Slider
                    defaultValue={1}
                    step={1}
                    min={1}
                    max={100}
                    valueLabelDisplay="auto"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </div>
            <br/>
            <div><BuySellToggle 
                isBuying={isBuying}
                onClick={setDirection}
            /></div>
            <br/>
            <div>
                <h3>{orderMessage}</h3>
                <h3>Total: ${(quantity * price).toFixed(2)}</h3>
            </div>
            <div><button 
            onClick={submit}
            className="button-selected submit"
            >SUBMIT</button></div>
            <br/>
        </div>
    )
}
