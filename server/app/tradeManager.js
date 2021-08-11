const Order = require("./order");
const Matcher = require("./matcher");
const MockOrders = require("./mockOrders");

function main() {

    let mockOrders = new MockOrders(5, 5, false);
    let ordersDb = mockOrders.getOrders();
    let buyOrders = ordersDb.buyOrders;
    let sellOrders = ordersDb.sellOrders;

    let matcher = new Matcher(sellOrders, buyOrders);
    let newOrder = mockOrders.createRandomOrder("BUY");
    matcher.matchNewOrder(newOrder);
};

main();