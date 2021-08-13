const Order = require("./order");
const Matcher = require("./matcher");
const Trade = require("./trade");
const mockOrders = require("./mockOrders");
const _ = require('lodash'); 

let ordersDb = mockOrders.getOrders();
let newOrder = mockOrders.getOrder("BUY");
let completedTrades = [];

// take new order, find matches and perform trades
function handleNewTrade(newOrder, ordersDb) {
    
    let matcher = new Matcher(ordersDb);
    let matchedOrders = matcher.matchNewOrder(newOrder);

    if (!matchedOrders) {
        ordersDb.push(newOrder);
    } else {
        
        // make trade with new order
        // newOrder is returned if unfulfilled and added to db
        if (makeTrades(newOrder, matchedOrders) != undefined ){
            ordersDb.push(newOrder);
        };
    };
}

// recieves matched orders and perform trades with new order
function makeTrades(newOrder, matchedOrders) {
    
    for (let i = 0; i < matchedOrders.length; i++) {
        
        if (matchedOrders[i].action == newOrder.action) {
            throw new Error("cannot perform trade between orders with same action");
        }

        // make trade and add to trade Db
        let trade = new Trade(matchedOrders[i], newOrder);
        completedTrades.push(trade);

        // new order has been fulfilled, stop making trades
        if (newOrder.quantity == 0) {
            break;
        // new order has remaining quantity but no more matches
        // add new order to database
        } else if ( i == matchedOrders.length - 1) {
            return newOrder;
        };
    };

    removeFulfilledOrders();

};

function getCompletedTrades() {
    return completedTrades;
}

function removeFulfilledOrders() {
    // remove all trades with 0 quantity.
    _.remove(ordersDb, function(order){return order.quantity == 0});
}

module.exports = { handleNewTrade, makeTrades, getCompletedTrades };
