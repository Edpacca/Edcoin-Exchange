import { Trade } from "./trade";
import { Order } from "./order";
import { debug } from "../debugLogger";

export function makeTrades(newOrder: Order, matchedOrders: Order[]) : Trade[] {
    debug('Trades completed:\n');
    const trades: Trade[] = [];

    for (let i = 0; i < matchedOrders.length; i++) {

        if (matchedOrders[i].action == newOrder.action) {
            throw new Error("cannot perform trade between orders with same action");
        }

        const trade = new Trade(matchedOrders[i], newOrder);
        trades.push(trade);

        debug(`${trade.action} ${trade.quantity} at ${trade.price}`);
        debug(`${trade.orderId1} -> ${trade.orderId2}\n`);

        if (newOrder.quantity === 0) return trades;
    }
    return trades;
}