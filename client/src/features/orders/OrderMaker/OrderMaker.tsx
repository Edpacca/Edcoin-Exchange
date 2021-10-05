import './styles/orderMaker.css';
import { ExchangeType } from '../../../models/exchangeType';
import React, { useState, ChangeEvent } from 'react';
import { Button, Slider } from '@material-ui/core';
import { OrderRequest } from '../../../models/orderRequest';
import { GetAllMarketTypes, MarketType } from '../../../models/marketType';
import { DropDownSelect } from '../../common/DropdownSelect';
import { store } from '../../../app/store';
import { OrderRequestModal } from './OrderRequestModal';

export function OrderMaker(props: {createOrder: (order: OrderRequest) => void}, activeUserId: string) {

    const [isBuying, setIsBuying] = useState<boolean>(true);
    const [price, setPrice] = useState<number>(50);
    const [quantity, setQuantity] = useState<number>(1);
    const [priceString, setPriceString] = useState<string>(price.toString());
    const [quantityString, setQuantityString] = useState<string>(quantity.toString());
    const [accountType, setAccountType] = useState<MarketType>(MarketType.USD);

    const [orderRequest, setOrderRequest] = useState<OrderRequest | undefined>(undefined);
    
    const handleSliderChange = (event: ChangeEvent<{}>, value: number | number[],
        setValue:(value: number) => void, setString:(value: string) => void) => {
        if(Array.isArray(value)) return;
        setValue(value as number);
        setString(value.toString());
    }

    const handleDropDownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const account = `${event.target.value}`;
        setAccountType(account as MarketType);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>,
        setValue: (value: number) => void, setString: ((value: string) => void) | undefined) => {

        // Enable decimal point to be entered in input after integer
        if (setString && validatePriceString(event.target.value)) {
            setString(event.target.value);
            return;
        }
        
        const newValue = parseFloat(event.target.value);
        if (!isNaN(newValue)) {
            setValue(newValue);
            if (setString) {
                setString(newValue.toString());
            }    
        }
    }

    const submit = () => {
        const userId = store.getState().users.activeUser?.id as string;
        const token = store.getState().users.jwt as string;
        const order: OrderRequest = {
            userId: userId,
            token: token,
            market: accountType,
            quantity: quantity,
            price: price,
            exchange: isBuying 
                ? ExchangeType.Buy 
                : ExchangeType.Sell,
        }
        props.createOrder(order);
        setOrderRequest(order);
    }

    const currency: string = accountType.slice(0, 3);
    const orderSummary: string = `${quantity} EDC at ${price.toFixed(2)} ${currency}`;
    const orderMessage = isBuying 
        ? <div><span className="buy-order">BUY</span> {orderSummary}</div>
        : <div><span className="sell-order">SELL</span> {orderSummary}</div>;

    return (
        <div className="order-form">
            {
                orderRequest !== undefined &&
                <OrderRequestModal 
                    order={orderRequest as OrderRequest}
                    clearOrder = {() => {setOrderRequest(undefined)}}
                />
            }
            <h3>ORDER FORM</h3>
            <div className='slider-filter'>
                <div className="text">
                    <div className="input-labels">
                        <span>PRICE</span>
                        <input
                            className="input"
                            value={priceString}
                            onChange={(event) => 
                                handleInputChange(event, setPrice, setPriceString)}
                        />
                        <span className="units">{accountType.slice(0, 3)}</span>
                    </div>
                </div>
                <Slider
                    step={0.01}
                    min={0.00}
                    max={100}
                    valueLabelDisplay='auto'
                    value={price}
                    onChange={(event, value) => handleSliderChange(event, value, setPrice, setPriceString)}
                />
            </div>
            <div className='slider-filter'>
                <div className="text">
                    <div className="input-labels">
                        <span>QUANTITY</span>
                        <input
                            className="input"
                            value={quantityString} 
                            onChange={(event) => 
                                handleInputChange(event, setQuantity, setQuantityString)}
                        />
                        <span className="units">EDC</span>
                    </div>
                </div>
                <Slider
                    step={1}
                    min={1}
                    max={100}
                    valueLabelDisplay='auto'
                    value={quantity}
                    onChange={(event, value) => handleSliderChange(event, value, setQuantity, setQuantityString)}
                />
            </div>
            <div className="order-filters">
                <DropDownSelect 
                    values={GetAllMarketTypes().filter(type => type !== "All")}
                    id={'selectAccount'}
                    onChange={handleDropDownChange}
                />
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
            </div>
            <div>
                <h2 data-testid ={'summary'}>{orderMessage}</h2>
                <h3>Total: {(quantity * price).toFixed(2)} {currency}</h3>
            </div>
            <div>
                <Button 
                    onClick={submit}
                    className='button-selected submit'
                    color='primary'
                    variant='contained'
                    >SUBMIT
                </Button>
            </div>
        </div>
    )
}

// Validate if decmial was entered after integer in input box
function validatePriceString(input: string): boolean {
    const length = input.length;
    const number = Number(input.slice(0, length - 1));
    return (
        input.charAt(length -1) === '.' &&
        !isNaN(number) &&
        number % 1 === 0
    );
}