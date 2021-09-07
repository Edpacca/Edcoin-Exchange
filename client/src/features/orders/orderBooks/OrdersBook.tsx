import { RenderOrderDetails } from './OrderDetails';
import { Order } from '../../../models/order';

export function OrdersBook(props: {orders: Order[], isPrivate: boolean}) {

    const detailsHeader = <td className='table-label'>Details</td>

    return (
        <table className='table-order'>
            <thead>
                <tr>
                    <th className='table-label'>Order Time</th>
                    <th className='table-label'>Account</th>
                    <th className='table-label'>Direction</th>
                    <th className='table-label'>Price</th>
                    <th className='table-label'>Quantity</th>
                    {props.isPrivate ? detailsHeader : undefined}
                </tr>
            </thead>
            <tbody>
                {props.orders.map((order) => RenderOrderDetails(order, props.isPrivate))}
            </tbody>
        </table>
    )
}
