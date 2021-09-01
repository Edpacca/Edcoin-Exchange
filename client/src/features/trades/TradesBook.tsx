import { RenderTradeDetails } from "./TradeDetails";
import { Trade } from "../../models/trade";

export function TradesBook(props: {trades: Trade[]}) {
    return (
        <table className="table-order">
            <thead>
                <td className="table-label">Trade Time</td>
                <td className="table-label">Account</td>
                <td className="table-label">Price</td>
                <td className="table-label">Quantity</td>
            </thead>
            <tbody>
                {props.trades.map((trade) => RenderTradeDetails(trade))}
            </tbody>
        </table>
    )
}
