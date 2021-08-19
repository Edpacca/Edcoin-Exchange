const mockOrders = require("./mockOrders");

let ordersDb = [];
let isDbInitialised = false;

function initialiseDb() {
    ordersDb = mockOrders.getOrders();
    isDbInitialised = true;
    return ordersDb;
}

function aggregateOrders() {

}

function getOrders() {
    return isDbInitialised 
        ? ordersDb 
        : initialiseDb();
}

module.exports = { getOrders, aggregateOrders } ;