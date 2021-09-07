import React, { useState } from 'react';
import { Modal } from '@material-ui/core';
import { Order } from '../../../models/order';
import logo from '../../.././logo.svg';
import { DirectionType } from '../../../models/directionType';
import { useAppSelector } from '../../../app/hooks';
import { selectUsers } from '../../users/userSlice';

export default function OrderDetailsModal(props: {order: Order}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};
    const userName = useAppSelector(selectUsers).find(user => user.id === props.order.userId)?.name;
    const style = props.order.direction === DirectionType.Buy ? 'buy-order' : 'sell-order';

    const body = (
        <div className='order-modal'>
            <img src={logo} className='App-logo' alt='logo' />
            <br/>
            <table className='table-modal'>
                <tbody>
                    <tr>
                        <th className='table-label'>User</th>
                        <td>{userName}</td>
                    </tr>
                    <tr>
                        <th className='table-label'>Direction</th>
                        <td className={style}>{props.order.direction}</td>
                    </tr>
                    <tr>
                        <th className='table-label'>Account</th>
                        <td>{props.order.account}</td>
                    </tr>
                    <tr>
                        <th className='table-label'>Price</th>
                        <td>{props.order.price}</td>
                    </tr>
                    <tr>    
                        <th className='table-label'>Quantity</th>
                        <td>{props.order.quantity}</td>
                    </tr>
                    <tr>
                        <th className='table-label'>Order ID</th>
                        <td>{props.order.id}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

    return (
        <div>
            <button onClick={handleOpen} className='order-details-button'/>
            <Modal open={open} onClose={handleClose}>
                {body}
            </Modal>
        </div>
    )

}