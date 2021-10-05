import { RenderTradeDetails } from './TradeDetails';
import { Trade } from '../../models/trade';

export function TradesBook(props: {trades: Trade[], isPrivate: boolean}) {

    const detailsHeader = <td className='table-label'>Details</td>

    return (
        <table className='main-table'>
            <thead>
                <tr>
                    <th className='table-label'>Date</th>
                    <th className='table-label'>Time</th>
                    <th className='table-label'>Market</th>
                    <th className='table-label'>Price</th>
                    <th className='table-label'>Quantity</th>
                    {props.isPrivate ? detailsHeader : undefined}
                </tr>
            </thead>
            <tbody>
                {props.trades.map((trade) => RenderTradeDetails(trade, props.isPrivate))}
            </tbody>
        </table>
    )
}
