class Trade {

    constructor(existingOrder, newOrder) {

        this.tradeTime = new Date();
        this.tradePrice = existingOrder.price;
        this.tradeQuantity = Math.min(
            existingOrder.quantity, newOrder.quantity);
        this.orderId1 = existingOrder.id;
        this.orderId2 = newOrder.id;

        this.#makeTrade(existingOrder, newOrder);
    };

    #makeTrade(existingOrder, newOrder){
        existingOrder.quantity -= this.tradeQuantity;
        newOrder.quantity -= this.tradeQuantity;
    };
}

module.exports = Trade;