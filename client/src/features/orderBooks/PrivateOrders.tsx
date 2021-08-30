import { RenderOrderDetails } from "./OrderDetails";
import { Button } from "@material-ui/core";
import { Order } from "../../models/order";
import { deleteOrder } from "../../app/orderSlice";
import { useAppDispatch } from "../../app/hooks";

export function PrivateOrders(props: {orders: Order[]}) {
    const dispatch = useAppDispatch();

    const handleClickDelete = (id: string) => {
        dispatch(deleteOrder(id));
    }

    const renderedOrders = props.orders.map((o) => 
        <li className="table-list-item" key={o.id}>{RenderOrderDetails(o)}
        <Button onClick={() => handleClickDelete(o.id)} color="primary">DELETE</Button>
        </li>);

        return (
            <ol className="table-list">{renderedOrders}</ol>
    )
}