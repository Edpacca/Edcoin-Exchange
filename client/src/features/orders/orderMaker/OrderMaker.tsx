import { DirectionToggle } from '../../generic/DirectionToggle';
import { DirectionType } from '../../../models/directionType';
import React, { useState } from 'react';
import { Slider } from '@material-ui/core';
import { OrderRequest } from '../../../models/orderRequest';
import { GetAllAccountTypes, AccountType } from '../../../models/accountType';
import { DropDownSelect } from '../../generic/DropdownSelect';

export function OrderMaker(props: {createOrder: (order: OrderRequest) => void}) {

    const [isBuying, setIsBuying] = useState<boolean>(true);
    const [price, setPrice] = useState<number>(50);
    const [quantity, setQuantity] = useState<number>(1);
    const [accountType, setAccountType] = useState<AccountType>(AccountType.USD);

    const setDirection = () => setIsBuying(!isBuying);

    const handleSliderChange = (event: React.ChangeEvent<{}>, value: number | number[], setValue:(value: number) => void) => {
        if(Array.isArray(value)) return;
        setValue(value as number);
    }

    const handleDropDownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const account = `${event.target.value}-EDC`;
        setAccountType(account as AccountType);
        console.log(account);
    }

    const submit = () => {
        const order: OrderRequest = {
            userId: "testId",
            account: accountType,
            quantity: quantity,
            price: price,
            direction: isBuying 
                ? DirectionType.Buy 
                : DirectionType.Sell,
        }
        props.createOrder(order);
    }

    const currency: string = accountType.slice(0, 3);
    const orderSummary: string = `${quantity} EDC at ${price.toFixed(2)} ${currency}`;
    const orderMessage: string = isBuying ? `BUY ${orderSummary}`: `SELL ${orderSummary}`;

    return (
        <div>
            <br/>
            <DropDownSelect 
                values={GetAllAccountTypes().filter(type => type !== "All")}
                id={"selectAccount"}
                onChange={handleDropDownChange}/>
            <br/>
            <div className="slider">
                <div><h4>PRICE</h4></div>
                <Slider
                    step={0.01}
                    min={0.00}
                    max={100}
                    valueLabelDisplay="auto"
                    value={price}
                    onChange={(event, value) => handleSliderChange(event, value, setPrice)}
                />
            </div>
            <div className="slider">
            <div><h4>QUANTITY</h4></div>
                <Slider
                    step={1}
                    min={1}
                    max={100}
                    valueLabelDisplay="auto"
                    value={quantity}
                    onChange={(event, value) => handleSliderChange(event, value, setQuantity)}
                />
            </div>
            <br/>
            <div><DirectionToggle 
                isBuying={isBuying}
                onClick={setDirection}
            /></div>
            <br/>
            <div>
                <h3>{orderMessage}</h3>
                <h3>Total: {(quantity * price).toFixed(2)} {currency}</h3>
            </div>
            <div><button 
            onClick={submit}
            className="button-selected submit"
            >SUBMIT</button></div>
            <br/>
        </div>
    )
}
