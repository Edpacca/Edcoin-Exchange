
import { ExchangeType } from '../../../models/exchangeType';
import { Order } from '../../../models/order';
import OrderDetailsModal from './OrderDetailsModal';
import dateFormat from 'dateformat'

export function RenderOrderDetails(order: Order, isPrivate: boolean) {
    const style = order.exchange === ExchangeType.Buy ? 'buy-order' : 'sell-order';
    const detailsButton = 
        <td className='table-data'>
            {
                isPrivate 
                ? <OrderDetailsModal order={order} /> 
                : undefined
            }

        </td>;
    
    return (
        <tr key={`${order.id}${isPrivate}`}>
            <td className='table-data'>{dateFormat(order.time, 'dd-mm-yy')}</td>
            <td className='table-data'>{dateFormat(order.time, 'hh:mm:ss')}</td>
            <td className='table-data'>{order.market}</td>
            <td className={'table-data ' + style}>{order.exchange}</td>
            <td className='table-data'>{order.price.toFixed(4)}</td>
            <td className='table-data'>{order.quantity}</td>
            {detailsButton}
        </tr>
    )
}