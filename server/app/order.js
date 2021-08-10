class Order {
    constructor(account, price, quantity, action) {
        this.account = account;
        this.quantity = quantity;
        this.price = price;
        this.action = action;
        this.orderTime = Date.now();
        this.id = Symbol("id");
    }
}