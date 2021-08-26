import { BuySellToggle } from './BuySellToggle';
import { Button } from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import { Order } from '../../models/order'
import { DirectionType } from '../../models/directionType';

const mockOrder: Order = {
    id: uuid(),
    orderTime: new Date(),
    account: 99,
    price: 20,
    direction: DirectionType.Buy,
    quantity: 5,
}

export function OrderUI() {
    return (
        <div>
            <div><h3>MAKE NEW ORDER</h3></div>
            <div><input placeholder="PRICE"></input></div>
            <div><input placeholder="QUANTITY"></input></div>
            <div><BuySellToggle /></div>
            <div><Button>SUBMIT</Button></div>
        </div>
    )
}