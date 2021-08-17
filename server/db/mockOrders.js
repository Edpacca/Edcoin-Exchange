const Order = require("../app/order");

function getOrder(action = "BUY") {

    if (action !== "BUY" && action !== "SELL") {
        return false;
    }

    return new Order(
        99, 
        getRandomArbitrary(10, 80), 
        getRandomInt(1, 50), action);
}

// generates an equal amount of orders with opposing actions
function getOrders(maxOrders = 5) {

    let orders = [];

    for (let i = 0; i < maxOrders * 2; i++) {

        
        let action = i < maxOrders ? "SELL" : "BUY";
        let newOrder = new Order(
            i, 
            getRandomArbitrary(10, 80), 
            getRandomInt(1, 50), action);

        orders.push(newOrder);
    }

    return orders;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = { getOrder, getOrders };