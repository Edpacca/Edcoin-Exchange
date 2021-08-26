import { BuySellToggle } from './BuySellToggle';
import { Button } from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import { Order } from '../../models/order'
import { DirectionType } from '../../models/directionType';
import { useEffect, useState } from 'react';
import { Slider } from '@material-ui/core';

export function OrderUI() {

    const [isBuying, setIsBuying] = useState<boolean>(true);
    const [price, setPrice] = useState<number>(50);
    const [quantity, setQuantity] = useState<number>(1);

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

    const handleInputPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    }
    const handleInputQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    }

    const submit = () => {
        const mockOrder: Order = {
            id: uuid(),
            orderTime: new Date(),
            account: 99,
            price: price,
            direction: isBuying 
                ? DirectionType.Buy 
                : DirectionType.Sell,
            quantity: quantity,
        }
    }

    const orderSummary: string = quantity + " at $" + price.toFixed(2);
    const orderMessage: string = isBuying ? "BUYING " + orderSummary: "SELLING " + orderSummary;

    return (
        <div>
            <div><h3>PLACE NEW ORDER</h3></div>
            <div className="slider">
                <input
                    placeholder="SET PRICE"
                    onChange={handleInputPriceChange}
                />
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
                <input
                    placeholder="SET QUANTITY"
                    onChange={handleInputQuantityChange}
                />
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
            <div><BuySellToggle 
                isBuying={isBuying}
                onClick={setDirection}
            /></div>
            <div>
                <h3>{orderMessage}</h3>
            </div>
            <div><Button onClick={submit}>SUBMIT</Button></div>
        </div>
    )
}