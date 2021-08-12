const Order = require("./order");

orders = [];

function getOrder(action = "BUY") {

    if (action !== "BUY" && action !== "SELL") {
        return false;
    }

    return new Order(
        99, 
        getRandomArbitrary(10, 80), 
        getRandomInt(1, 50), action);
};

function generateOrders(maxOrders) {

    for (let i = 0; i < maxOrders; i++) {

        let newSellOrder = new Order(
            i, 
            getRandomArbitrary(10, 80), 
            getRandomInt(1, 50), "SELL");

        orders.push(newSellOrder);
    };
    
    for (let i = 0; i < maxOrders; i++) {

        let newBuyOrder = new Order(
            i + maxOrders, 
            getRandomArbitrary(10, 80), 
            getRandomInt(1, 50), "BUY");

        orders.push(newBuyOrder);
    };
};

function getOrders(maxOrders = 5) {

    generateOrders(maxOrders);

    return orders;
};

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

module.exports = { getOrder, getOrders };