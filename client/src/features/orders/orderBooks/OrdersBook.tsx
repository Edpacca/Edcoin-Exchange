import { RenderOrderDetails } from "./OrderDetails";
import { Order } from "../../../models/order";

export function OrdersBook(props: {orders: Order[]}) {
    return (
        <table className="table-order">
            <thead>
                <td className="table-label">Order Time</td>
                <td className="table-label">Account</td>
                <td className="table-label">Direction</td>
                <td className="table-label">Price</td>
                <td className="table-label">Quantity</td>
            </thead>
            <tbody>
                {props.orders.map((order) => RenderOrderDetails(order))}
            </tbody>
        </table>
    )
}
