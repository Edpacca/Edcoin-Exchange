class Trade {

    constructor(existingOrder, newOrder) {

        this.time = new Date();
        this.price = existingOrder.price;
        this.quantity = Math.min(
            existingOrder.quantity, newOrder.quantity);
        this.action = existingOrder.action;
        this.orderId1 = existingOrder.id;
        this.orderId2 = newOrder.id;

        this.#makeTrade(existingOrder, newOrder);
    };

    #makeTrade(existingOrder, newOrder){
        existingOrder.quantity -= this.quantity;
        newOrder.quantity -= this.quantity;
    };
}

module.exports = Trade;