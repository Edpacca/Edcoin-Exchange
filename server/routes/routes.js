const mockOrders = require('../app/mockOrders');

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

    app.get("/orders", function(req, res) {
        res.status(200).send(mockOrders.getOrders());
    });

    app.get("/order/:num", function(req, res) {
        
        let orders = mockOrders.getOrders();
        let id = req.params.num;

        res.status(200).send(orders.find(o => o.id === id));
    });
}

module.exports = appRouter;