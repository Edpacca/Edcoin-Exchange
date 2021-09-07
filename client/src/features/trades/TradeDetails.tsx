import { Trade } from '../../models/trade';
import TradeDetailsModal from './TradeDetailsModal';
import dateFormat from 'dateformat';

export function RenderTradeDetails(trade: Trade, isPrivate: boolean) {
    
    const detailsButton = 
    <td>
        <TradeDetailsModal trade={trade}/>
    </td>;

    return (
        <tr key={`${trade.id}${isPrivate}`}>
            <td className='table-data'>{dateFormat(trade.time, 'dd-mm-yy hh:mm:ss:ms')}</td>
            <td className='table-data'>{trade.account}</td>
            <td className='table-data'>{trade.price.toFixed(4)}</td>
            <td className='table-data'>{trade.quantity}</td>
            {isPrivate ? detailsButton : undefined}
        </tr>
    )
}