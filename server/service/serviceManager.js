const Matcher = require("../app/matcher");
const Trader = require("../app/trader")
const _ = require('lodash'); 

class ServiceManager { 

    constructor(ordersDb, tradesDb) {
        this.ordersDb = ordersDb;
        this.tradesDb = tradesDb;
    }

    handleNewOrder(newOrder) {
    
        if(!this.#validateOrder) return false;

        console.log(`New order: ${newOrder.action} ${newOrder.price} at ${newOrder.quantity}\n\n`);

        const matchedOrders = new Matcher(this.ordersDb).matchNewOrder(newOrder);

        if (!matchedOrders) {
            console.log(`No matches found\nAdding new order ${newOrder.id} to database...`)
            this.ordersDb.push(order);
            return;
        }

        const trades = new Trader().makeTrades(newOrder, matchedOrders);

        if (newOrder.quantity === 0) {
            console.log('New order fulfilled.\n');
        } else {
            console.log(`New order not fulfilled. \nAdding order ${newOrder.id} to database.\n\n`);
            this.ordersDb.push(order);
        }

        _.remove(this.ordersDb, order => order.quantity === 0);
        this.tradesDb.push(...trades);
    }

    #validateOrder(newOrder) {
        if (!(newOrder instanceof Order)) {
            console.log("new order is of invalid type");
            return false;
        } 
        if (newOrder.action !== "BUY" && newOrder.action !== "SELL") {
            console.log("new order does not have valid BUY/SELL action");
            return false;
        } 
        return true;
    }
}

module.exports = ServiceManager;
