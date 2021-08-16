class Trade {

    constructor(existingOrder, newOrder) {

        this.existingOrder = existingOrder,
        this.existingOrder.originalQuantity = existingOrder.quantity;
        this.newOrder = newOrder,
        this.newOrder.originalQuantity = newOrder.quantity;
        this.tradeTime = Date.now();
        this.tradePrice = this.existingOrder.price;
        this.tradeQuantity = Math.min(
            this.existingOrder.quantity, this.newOrder.quantity);

        this.makeTrade();
    };

    makeTrade(){
        this.existingOrder.quantity -= this.tradeQuantity;
        this.newOrder.quantity -= this.tradeQuantity;
    };
}

module.exports = Trade;