const Matcher = require("./matcher");
const Trade = require("./trade");
const _ = require('lodash'); 

let trades = [];
let message = '';

// take new order, find matches and perform trades
function handleNewTrade(newOrder, ordersDb) {
    
    let matcher = new Matcher(ordersDb);
    let matchedOrders = matcher.matchNewOrder(newOrder);

    let isOrderFulfilled = (makeTrades(newOrder, matchedOrders));

    if (!isOrderFulfilled) {

        message += `New order not fulfilled. \nAdding order ${newOrder.id} to database.\n\n`
        return false;

    } else {

        message += 'New order fulfilled.\n'
        return true;
    };
    
}

function getTradeData() {
    return {
        trades,
        message
    };
}

// recieves matched orders and perform trades with new order
function makeTrades(newOrder, matchedOrders) {
    
    if (matchedOrders.length === 0) {
        message += "No matches found.\n";
        return false;
    }

    for (let i = 0; i < matchedOrders.length; i++) {
        
        if (matchedOrders[i].action == newOrder.action) {
            throw new Error("cannot perform trade between orders with same action");
        }

        // make trade and add to trade Db
        let trade = new Trade(matchedOrders[i], newOrder);
        trades.push(trade);

        // new order has been fulfilled, stop making trades
        if (newOrder.quantity == 0) {
            return true;

        // return false if new order has no more matches
        } else if ( i == matchedOrders.length - 1) {
            return false;
        };
    };

};

module.exports = { handleNewTrade, getTradeData, makeTrades };
