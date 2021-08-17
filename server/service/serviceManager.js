const Matcher = require("../app/matcher");
const Trader = require("../app/trader");
const Order = require("../app/order");
const debug = require("../../debugLogger");
const _ = require('lodash'); 

class ServiceManager { 

    constructor(ordersDb, tradesDb) {
        this.ordersDb = ordersDb;
        this.tradesDb = tradesDb;
    }

    handleNewOrder(newOrder) {
    
        if(!this.validateOrder) return false;

        debug(`New order: ${newOrder.action} ${newOrder.price} at ${newOrder.quantity}\n`);

        const matchedOrders = new Matcher(this.ordersDb).matchNewOrder(newOrder);

        if (!matchedOrders) {
            debug(`No matches found\nAdding new order ${newOrder.id} to database...`)
            this.ordersDb.push(newOrder);
            return true;
        }

        const trades = new Trader().makeTrades(newOrder, matchedOrders);

        if (newOrder.quantity === 0) {
            debug('New order fulfilled.\n');
        } else {
            debug(`New order not fulfilled. \nAdding order ${newOrder.id} to database.\n\n`);
            this.ordersDb.push(order);
        }

        _.remove(this.ordersDb, order => order.quantity === 0);
        this.tradesDb.push(...trades);
        return true;
    }

    validateOrder(newOrder) {
        if (!(newOrder instanceof Order)) {
            debug("new order is of invalid type");
            return false;
        } 
        if (newOrder.action !== "BUY" && newOrder.action !== "SELL") {
            debug("new order does not have valid BUY/SELL action");
            return false;
        } 
        return true;
    }
}

module.exports = ServiceManager;
