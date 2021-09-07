
import { DirectionType } from '../../../models/directionType';
import { Order } from '../../../models/order';
import OrderDetailsModal from './OrderDetailsModal';
import dateFormat from 'dateformat'

export function RenderOrderDetails(order: Order, isPrivate: boolean) {
    const style = order.direction === DirectionType.Buy ? 'buy-order' : 'sell-order';
    const detailsButton = 
        <td>
            <OrderDetailsModal order={order} />
        </td>;
    
    return (
        <tr key={`${order.id}${isPrivate}`}>
            <td className='table-data'>{dateFormat(order.time, 'dd-mm-yy hh:mm:ss:ms')}</td>
            <td className='table-data'>{order.account}</td>
            <td className={'table-data ' + style}>{order.direction}</td>
            <td className='table-data'>{order.price.toFixed(4)}</td>
            <td className='table-data'>{order.quantity}</td>
            {isPrivate ? detailsButton : undefined}
        </tr>
    )
}

