import { RenderOrderDetails } from "./OrderDetails"

const mockOrders = [
        {
            orderTime: "2021-08-26T10:02:36.712Z",
            id: "f9a40020-2e52-473b-92de-2d65d3c6d774",
            account: 0,
            quantity: 46,
            price: 39.548511672746095,
            direction: "SELL"
        },  
        {   
            orderTime: "2021-08-26T10:02:36.712Z",
            id: "ba8a32b9-2e68-4db2-89d8-74994ab2887e",
            account: 1,
            quantity: 12,
            price: 44.94696969930247,
            direction: "SELL"
        },  
        {   
            orderTime: "2021-08-26T10:02:36.712Z",
            id: "5ab0ecdc-9ca5-471e-9c06-09560dc2ab7a",
            account: 2,
            quantity: 30,
            price: 77.09042122916647,
            direction: "BUY"
        },  
        {   
            orderTime: "2021-08-26T10:02:36.712Z",
            id: "8423076d-10d3-46ff-a2b7-d6ebe715b532",
            account: 3,
            quantity: 32,
            price: 39.84791285233185,
            direction: "BUY"
        }
]

export function UserOrders() {
    
    const orders: any = [];

    mockOrders.forEach(order => {
        
        const orderDetails = <li className="table-list">{RenderOrderDetails(order)}</li>
        orders.push(orderDetails);
    })
    
    return (
        <ol>{orders}</ol>
    )
}