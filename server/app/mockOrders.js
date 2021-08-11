const Order = require("./order");

class MockOrders {

    maxSellOrders = 5;
    maxBuyOrders = 5;
    debug = false;
    sellOrders = [];
    buyOrders = [];

    constructor(maxSellOrders, maxBuyOrders, debug){
        this.maxSellOrders = maxSellOrders;
        this.maxBuyOrders = maxBuyOrders;
        this.debug = debug;
    };

    createRandomOrder(action) {

        if (action !== "BUY" && action !== "SELL") {
            return false;
        }

        return new Order(
            99, 
            this.getRandomArbitrary(10, 80), 
            this.getRandomInt(1, 50), action);
    };
    
    generateOrders() {
        for (let i = 0; i < this.maxSellOrders; i++) {

            let newSellOrder = new Order(
                i, 
                this.getRandomArbitrary(10, 80), 
                this.getRandomInt(1, 50), "SELL");

            this.sellOrders.push(newSellOrder);
            if (this.debug) console.log(newSellOrder);
        };
        
        for (let i = 0; i < this.maxBuyOrders; i++) {

            let newBuyOrder = new Order(
                i, 
                this.getRandomArbitrary(10, 80), 
                this.getRandomInt(1, 50), "BUY");

            this.buyOrders.push(newBuyOrder);
            if (this.debug) console.log(newBuyOrder);    
        };
    };

    getOrders() {

        this.generateOrders();

        return {
            sellOrders: this.sellOrders,
            buyOrders: this.buyOrders,
        };
    };

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    };

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    };
};

module.exports = MockOrders;