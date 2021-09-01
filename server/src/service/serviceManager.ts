import * as _ from 'lodash'; 
import { Matcher } from "../app/matcher";
import { Order } from "../app/order";
import { Trade } from "../app/trade";
import { makeTrades } from "../app/trader";
import { debug } from "../debugLogger";
export class ServiceManager { 

    constructor(readonly ordersDb: Order[], readonly tradesDb: Trade[], readonly matcher: Matcher) {
    }

    handleNewOrder(newOrder: Order): boolean {
        if(!this.validateOrder) return false;
        debug(`New order: ${newOrder.direction} ${newOrder.price} at ${newOrder.quantity}\n`);
        const matchedOrders = this.matcher.matchNewOrder(newOrder);

        if (matchedOrders.length === 0) {
            debug(`No matches found\nAdding new order ${newOrder.id} to database...`)
            this.ordersDb.push(newOrder);
            return true;
        }

        const trades = makeTrades(newOrder, matchedOrders);

        if (newOrder.quantity === 0) {
            debug('New order fulfilled.\n');
        } else {
            debug(`New order not fulfilled. \nAdding order ${newOrder.id} to database.\n\n`);
            this.ordersDb.push(newOrder);
        }

        _.remove(this.ordersDb, order => order.quantity === 0);
        this.tradesDb.push(...trades);
        return true;
    }

    validateOrder(newOrder: Order): boolean {
        if (newOrder.direction !== "BUY" && newOrder.direction !== "SELL") {
            debug("new order does not have valid BUY/SELL action");
            return false;
        } 
        return true;
    }
}