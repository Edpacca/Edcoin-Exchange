const _ = require('lodash'); 
const Order = require('../app/order');
const tradeManager = require('../app/tradeManager');
const db = require('../db/dbManager');

let ordersDb = db.getOrders();
let tradesDb = [];

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
            result.status(400).send("Invalid id");
        } else {
            result.status(200).send(order);
        };

    });

    // create new order, match and perform trades
    // return message log of activity
    app.post("/order", (request, result) => {

        // only verifying order direction for test
        if (request.body.action !== "BUY" && request.body.action !== "SELL") {

            result.status(400).send("invalid action: cannot create order");

        } else {

            let order = new Order(
                request.body.account,
                request.body.quantity,
                request.body.price,
                request.body.action);

            // pass order to trade manager
            // trade data contains message and trades[]
            new tradeManager.handleNewTrade(order, ordersDb);
            let tradeData = tradeManager.getTradeData();

            let message = `New order: ${order.action} ${order.price} at ${request.body.quantity}\n\n`;
            message += tradeData.message;

            if (order.quantity !== 0) {
                ordersDb.push(order);
            } 

            if (tradeData.trades.length !== 0) {

                tradesDb.push(tradeData.trades);

                message += 'Trades completed:\n';
                
                for (let t of tradeData.trades) {
                    message += `
                    ${t.existingOrder.action} ${t.tradeQuantity} at ${t.tradePrice} 
                    ${t.existingOrder.id} -> ${t.newOrder.id}\n\n`
                }
            }

            _.remove(ordersDb, function(order){return order.quantity == 0});
            
            result.status(201).send(message);
        }

    });

}

module.exports = appRouter;