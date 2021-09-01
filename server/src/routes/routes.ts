import * as _ from 'lodash';
import { ServiceManager } from '../service/serviceManager';
import { Order } from '../app/order';
import { Trade } from '../app/trade';
import { Matcher } from '../app/matcher';
import { getOrders } from '../db/dbManager';
import * as express from 'express';

// Temporary location for Db rerences
const tradesDb: Trade[] = [];
const ordersDb: Order[] = getOrders();

export function appRouter(app: express.Express): void {

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
        const order = ordersDb.find(o => o.id === request.params.id);

        if (order == null) {
            result.status(404).send("Invalid id");
        } else {
            result.status(200).send(order);
        }
    });

    // create new order, match and perform trades
    app.post("/order", (request, result) => {
        try {
            const order = new Order(
                request.body.account,
                request.body.price,
                request.body.quantity,
                request.body.direction)

            // instantiate serviceManager with db references and a new matcher
            // pass new order to serviceManager to handle matching and trading
            const serviceManager = new ServiceManager(ordersDb, tradesDb, new Matcher(ordersDb));
            serviceManager.handleNewOrder(order);
            result.status(201).send(order);
            } catch (error) {
                result.status(400).send(`invalid order request: ${request}`);
            }
    });

    app.delete("/order/:id", (request, result) => {
        const id = request.params.id;
        _.remove(ordersDb, o => o.id === id);
        result.status(200).send(`Deleted order from database with id: ${id}`);
    });
}