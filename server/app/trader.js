const Trade = require("./trade");
const debug = require("../../debugLogger");

const trader = {

    makeTrades(newOrder, matchedOrders) {
        debug('Trades completed:\n');
        const trades = [];

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
}

module.exports = trader;

