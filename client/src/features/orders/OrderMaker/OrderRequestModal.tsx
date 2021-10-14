import { useState } from 'react';
import { Modal } from '@material-ui/core';
import logo from '../../.././logo.svg';
import { ExchangeType } from '../../../models/exchangeType';
import { OrderRequest } from '../../../models/orderRequest';
import { SentimentDissatisfied } from '@material-ui/icons';
import { Status } from '../../../models/status';

export function OrderRequestModal(props: {order: OrderRequest, clearOrder: () => void, status: Status}) {
    const [open, setOpen] = useState(true);
    const isComplete = props.status === 'idle';
    const handleClose = () => {
        setOpen(false);
        props.clearOrder();
    };
    const style = props.order.exchange === ExchangeType.Buy ? 'buy-order' : 'sell-order';

    const body = (
        <div className='modal'>
            <img src={logo} className={`modal-${props.status}`} alt='logo' />
            <br/>
            {
                props.status !== 'failed' &&
                <h3>{`New order ${isComplete ? "placed" : "pending..."}`}</h3>
            }
                {
                    isComplete &&
                    <table className='table-modal'>
                        <tbody>
                            <tr>
                                <th className='table-label'>Direction</th>
                                <td className={style}>{props.order.exchange}</td>
                            </tr>
                            <tr>
                                <th className='table-label'>Account</th>
                                <td>{props.order.market}</td>
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
                }
                {
                    props.status === 'failed' &&
                    <div className="orderFailed">
                        <h2>Something went wrong...</h2>
                        <SentimentDissatisfied
                        fontSize='large'
                        />
                        <p>Please try again later</p>
                    </div>
                }
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