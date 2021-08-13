const { v4: uuid } = require('uuid');
class Order {

    orderTime = Date.now();
    id = uuid();

    constructor(account, price, quantity, action) {
        this.account = account;
        this.quantity = quantity;
        this.price = price;
        this.action = action;
    }
}

module.exports = Order;