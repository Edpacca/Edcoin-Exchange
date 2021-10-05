import logo from '../.././logo.svg';
import dateFormat from 'dateformat';
import { useState } from 'react';
import { Modal } from '@material-ui/core';
import { Trade } from '../../models/trade';
import { UserAccount } from '../../models/userAccount';
import { ExchangeType } from '../../models/exchangeType';
import { useAppSelector } from '../../app/hooks';
import { selectActiveUser } from '../users/userSlice';
import { Visibility } from '@material-ui/icons';

export default function OrderDetailsModal(props: {trade: Trade}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};

    const activeUser = useAppSelector(selectActiveUser) as UserAccount;

    const userExchange = activeUser.id === props.trade.buyUserId 
        ? ExchangeType.Buy 
        : ExchangeType.Sell;

    const summary = userExchange === ExchangeType.Buy 
        ? ` bought ${props.trade.quantity} EDC for ${props.trade.quantity * props.trade.price} ${props.trade.market.slice(0, 3)}`
        : ` sold ${props.trade.quantity} EDC for ${(props.trade.quantity * props.trade.price).toFixed(4)} ${props.trade.market.slice(0, 3)}`;
    const style = userExchange === ExchangeType.Buy ? 'buy-order' : 'sell-order';

    const body = (
        <div className='modal'>
            <img src={logo} className='modal-logo' alt='logo' />
            <br/>
            <h4>
                {activeUser.name} 
                <span className={style}>{summary}</span>  
            </h4> 
            <table className='table-modal'>
                <tbody>
                    <tr>
                        <th className='table-label'>Time</th>
                        <td>{dateFormat(props.trade.time, 'dd-mm-yy hh:mm:ss:ms')}</td>
                    </tr>
                    <tr>
                        <th className='table-label'>Market</th>
                        <td>{props.trade.market}</td>
                    </tr>
                    <tr>
                        <th className='table-label'>Price</th>
                        <td>{props.trade.price}</td>
                    </tr>
                    <tr>    
                        <th className='table-label'>Quantity</th>
                        <td>{props.trade.quantity}</td>
                    </tr>
                    <tr>
                        <th className='table-label'>Trade ID</th>
                        <td>{props.trade.id}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

    return (
        <div>
            <button onClick={handleOpen} className='modal-button'><Visibility fontSize={"small"}/></button>
            <Modal open={open} onClose={handleClose}>
                {body}
            </Modal>
        </div>
    )

}