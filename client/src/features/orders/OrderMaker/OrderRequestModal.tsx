import { useState } from 'react';
import { Modal } from '@material-ui/core';
import logo from '../../.././logo.svg';
import { DirectionType } from '../../../models/directionType';
import { OrderRequest } from '../../../models/orderRequest';

export function OrderRequestModal(props: {order: OrderRequest, clearOrder: () => void}) {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
        props.clearOrder();
    };
    const style = props.order.direction === DirectionType.Buy ? 'buy-order' : 'sell-order';

    const body = (
        <div className='modal'>
            <img src={logo} className='modal-logo' alt='logo' />
            <br/>
            <h3>New order placed</h3>
            <table className='table-modal'>
                <tbody>
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
                </tbody>
            </table>
        </div>
    )

    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                {body}
            </Modal>
        </div>
    )
}