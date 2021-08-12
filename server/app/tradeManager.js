const Order = require("./order");
const Matcher = require("./matcher");
const Trade = require("./trade");
const mockOrders = require("./mockOrders");
var _ = require('lodash'); 

let ordersDb = mockOrders.getOrders();
let matcher = new Matcher(ordersDb);
let newOrder = mockOrders.getOrder("BUY");

// print Db for debug 
printDb();

handleNewTrade(newOrder);

// print Db again for debug
printDb();

// take new order, find matches and perform trades
function handleNewTrade(newOrder) {
    
    let matchedOrders = matcher.matchNewOrder(newOrder);

    if (!matchedOrders) {
        console.log("\nno matchings orders.");
        console.log("adding new order to databse...");
        ordersDb.push(newOrder);
    } else {
        // console.log("\nmatched orders:");
        // console.log(matchedOrders);
        makeTrades(newOrder, matchedOrders);
    };
}

// take matching orders and perform trades
function makeTrades(newOrder, matchedOrders) {
    
    for (let i = 0; i < matchedOrders.length; i++) {
        
        console.log("\n\nMatched trade: ");
        console.log(matchedOrders[i]); 
        console.log(`\nMaking trade: ${matchedOrders[i].action} at ${matchedOrders[i].price}`);

        if (matchedOrders[i].action == newOrder.action) {
            throw console.error("cannot perform trade between orders with same action");
        }

        let trade = new Trade(matchedOrders[i], newOrder);

        // new order has been fulfilled, stop making trades
        if (newOrder.quantity == 0) {
            console.log("\nnew order fulfilled.");
            break;
        // new order has remaining quantity, and there are remaining matches
        } else if (i < matchedOrders.length - 1) {
            console.log("\ntrade completed. new order has remaining quantity. continuing trades.")
            console.log(newOrder);
        // new order has remaining quantity but no more matches
        } else {
            console.log("trade completed. no more matches. adding new trade to database...");
            ordersDb.push(newOrder);
            console.log(newOrder);
        };
    };

    // remove all trades with 0 quantity.
    console.log("\n removing fulfilled trades from database:")
    console.log(ordersDb.filter(function(order){return order.quantity == 0}));
    _.remove(ordersDb, function(order){return order.quantity == 0});

};

// debug for database
function printDb() {
    console.log("\n\n" + ordersDb.length + " orders in database");
    console.log(ordersDb);
}
