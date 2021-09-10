import { DirectionType } from '../../../models/directionType';
import React, { useState } from 'react';
import { Button, Slider } from '@material-ui/core';
import { OrderRequest } from '../../../models/orderRequest';
import { GetAllAccountTypes, AccountType } from '../../../models/accountType';
import { DropDownSelect } from '../../common/DropdownSelect';
import { store } from '../../../app/store';

export function OrderMaker(props: {createOrder: (order: OrderRequest) => void}) {

    const [isBuying, setIsBuying] = useState<boolean>(true);
    const [price, setPrice] = useState<number>(50);
    const [quantity, setQuantity] = useState<number>(1);
    const [accountType, setAccountType] = useState<AccountType>(AccountType.USD);

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
        const userId = store.getState().users.activeUser?.id as string;
        const order: OrderRequest = {
            userId: userId,
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
                id={'selectAccount'}
                onChange={handleDropDownChange}/>
            <br/>
            <div className='slider'>
                <div><h4>PRICE</h4></div>
                <Slider
                    step={0.01}
                    min={0.00}
                    max={100}
                    valueLabelDisplay='auto'
                    value={price}
                    onChange={(event, value) => handleSliderChange(event, value, setPrice)}
                />
            </div>
            <div className='slider'>
            <div><h4>QUANTITY</h4></div>
                <Slider
                    step={1}
                    min={1}
                    max={100}
                    valueLabelDisplay='auto'
                    value={quantity}
                    onChange={(event, value) => handleSliderChange(event, value, setQuantity)}
                />
            </div>
            <br/>
            <div>
                <Button 
                    onClick={() => setIsBuying(true)}
                    color={isBuying ? 'primary' : 'default'}
                    variant={isBuying ? 'outlined' : 'text'}
                    >BUY
                </Button>
                <Button 
                    onClick={() => setIsBuying(false)}
                    color={!isBuying ? 'primary' : 'default'}
                    variant={!isBuying ? 'outlined' : 'text'}
                    >SELL
                </Button>
            </div>
            <br/>
            <div>
                <h3 data-testid ={'summary'}>{orderMessage}</h3>
                <h3>Total: {(quantity * price).toFixed(2)} {currency}</h3>
            </div>
            <br/>
            <div>
                <Button 
                    onClick={submit}
                    className='button-selected submit'
                    color='primary'
                    variant='contained'
                    >SUBMIT
                </Button>
            </div>
            <br/>
            <br/>
        </div>
    )
}
