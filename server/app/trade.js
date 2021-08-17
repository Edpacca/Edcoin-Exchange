class Trade {

    constructor(existingOrder, newOrder) {

        this.tradeTime = new Date(Date.now());

        this.existingOrder = existingOrder;
        this.newOrder = newOrder;
        this.existingOrder.originalQuantity = existingOrder.quantity;
        this.newOrder.originalQuantity = newOrder.quantity;

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