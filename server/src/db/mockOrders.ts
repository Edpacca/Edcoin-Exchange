import { Order } from "../app/order";

export function getMockOrder(action: string = "BUY" ): boolean | Order {
    if (action !== "BUY" && action !== "SELL") {
        return false;
    }

    return new Order(
        99, 
        getRandomArbitrary(10, 80), 
        getRandomInt(1, 50), action);
}

// generates an equal amount of orders with opposing actions
export function getMockOrders(maxOrders: number = 5): Order[] {
    let orders: Order[] = [];
    for (let i = 0; i < maxOrders * 2; i++) {
        let action = i < maxOrders ? "SELL" : "BUY";
        let newOrder = new Order(
            i, 
            getRandomArbitrary(10, 80), 
            getRandomInt(1, 50), action);

        orders.push(newOrder);
    }
    return orders;
}

function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}