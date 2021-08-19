import { getMockOrders } from './mockOrders';
import { Order } from '../app/Order'

let ordersDb: Order[] = [];
let isDbInitialised = false;

function initialiseDb() {
    ordersDb = getMockOrders();
    isDbInitialised = true;
    return ordersDb;
}

function aggregateOrders() {

}

export function getOrders() {
    return isDbInitialised 
        ? ordersDb 
        : initialiseDb();
}