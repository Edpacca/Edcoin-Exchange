class Order {

    orderTime = Date.now();
    id = Symbol("id");

    constructor(account, price, quantity, action) {
        this.account = account;
        this.quantity = quantity;
        this.price = price;
        this.action = action;
    }
}

module.exports = Order;