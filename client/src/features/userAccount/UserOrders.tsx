import { RenderOrderDetails } from "./OrderDetails";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { Order } from "../../models/order";


export function UserOrders(props: {orders: Order[]}) {
    const dispatch = useDispatch();

    const handleClickDelete = (id: string) => {
        dispatch({type: "orders/orderDeleted", payload: id});
    }

    const renderedOrders = props.orders.map((o) => 
        <li className="table-list-item" key={o.id}>{RenderOrderDetails(o)}
        <Button onClick={() => handleClickDelete(o.id)} color="primary">DELETE</Button>
        </li>);

        return (
            <ol className="table-list">{renderedOrders}</ol>
    )
}