const Order = require('../app/order');
const db = require('../db/dbManager');

let ordersDb = db.getOrders();
/* 
3. Integrate the express framework into your server-side code.

4. Adapt your server-side code to store aggregated order book / private order book /
trade data. The aggregated order book should aggregate on price, the number of
assets being sought or offered at each price level.

5. Allow clients to retrieve the above data from the server.

6. Allow clients to send new orders that are passed on to the matcher.

7. When a new order is received, ensure the updated aggregated order book / private
order book and trade data is returned in the response.

8. Extend your tests to cover any newly introduced or changed behaviour.
*/

const appRouter = function(app) {

    // 5 GET aggregated orders (dict) => return list
    // 5 GET trade data => 
    // 6 POST create new order => send to matcher

    app.get("/orders", (request, result) => {

        result.status(200).send(ordersDb);
    });

    app.get("/order/:id", (request, result) => {
        
        let order = ordersDb.find(o => o.id === request.params.id);

        if (order == null) {
            result.status(400).send("Invalid id");
        } else {
            result.status(200).send(order);
        };

    });

    app.post("/order", (request, result) => {

        // only verifying order direction for mock model
        if (request.body.action !== "BUY" && request.body.action !== "SELL") {

            result.status(400).send("invalid action: cannot create order");

        } else {

            let order = new Order(
                request.body.account,
                request.body.quantity,
                request.body.price,
                request.body.action);
    
            ordersDb.push(order);

            result.status(201).send(order);
        }

    });

}

module.exports = appRouter;