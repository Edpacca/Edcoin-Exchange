const _ = require('lodash'); 
const Order = require('../app/order');
const ServiceManager = require('../service/serviceManager');
const db = require('../db/dbManager');

// Temporary location for Db rerences
const tradesDb = [];
const ordersDb = db.getOrders();

const appRouter = function(app) {

    // GET all orders unsorted
    app.get("/orders", (request, result) => {
        result.status(200).send(ordersDb);
    });

    // GET all trades
    app.get("/trades", (request, result) => {
        result.status(200).send(tradesDb);
    });

    // GET order by uuid
    app.get("/order/:id", (request, result) => {
        
        let order = ordersDb.find(o => o.id === request.params.id);

        if (order == null) {
            result.status(404).send("Invalid id");
        } else {
            result.status(200).send(order);
        };

    });

    // create new order, match and perform trades
    app.post("/order", (request, result) => {

        // only verifying order direction for test
        if (request.body.action !== "BUY" && request.body.action !== "SELL") {
            result.status(400).send("invalid action: cannot create order");
        } else {

            const order = new Order(
                request.body.account,
                request.body.price,
                request.body.quantity,
                request.body.action);

            // pass order to serviceManager which handles matching and trading
            const serviceManager = new ServiceManager(ordersDb, tradesDb);
            serviceManager.handleNewOrder(order);
            result.status(201).send(order);
        };

    });

}

module.exports = appRouter;