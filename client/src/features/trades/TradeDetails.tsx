import { Trade } from "../../models/trade";
import dateFormat from "dateformat"

export function RenderTradeDetails(trade: Trade) {
    return (
        <tr>
            <td className="table-data">{dateFormat(trade.time, "dd-mm-yy hh:mm:ss:ms")}</td>
            <td className="table-data">{trade.account}</td>
            <td className="table-data">{trade.price.toFixed(4)}</td>
            <td className="table-data">{trade.quantity}</td>
        </tr>
    )
}