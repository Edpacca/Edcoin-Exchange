import { Trade } from '../../models/trade';
import TradeDetailsModal from './TradeDetailsModal';
import dateFormat from 'dateformat';

export function RenderTradeDetails(trade: Trade, isPrivate: boolean) {
    
    const detailsButton = 
        <td className='table-data'>
            {
                isPrivate
                ? <TradeDetailsModal trade={trade}/>
                : undefined
            }
        </td>;

    return (
        <tr key={`${trade.id}${isPrivate}`}>
            <td className='table-data'>{dateFormat(trade.time, 'dd-mm-yy')}</td>
            <td className='table-data'>{dateFormat(trade.time, 'hh:mm:ss')}</td>
            <td className='table-data'>{trade.account}</td>
            <td className='table-data'>{trade.price.toFixed(4)}</td>
            <td className='table-data'>{trade.quantity}</td>
            {detailsButton}
        </tr>
    )
}