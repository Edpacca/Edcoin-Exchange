class Trade {

    constructor(existingOrder, newOrder) {

        this.orders = [
            this.existingOrder = existingOrder,
            this.newOrder = newOrder,
        ];

        this.tradeTime = Date.now();
        this.tradePrice = this.existingOrder.price;
        this.tradeQuantity = Math.min(
            this.existingOrder.quantity, this.newOrder.quantity);

        this.makeTrade();
    };

    makeTrade(){

        this.orders.forEach(order => {
            order.quantity -= this.tradeQuantity;
        });
    };
}

module.exports = Trade;