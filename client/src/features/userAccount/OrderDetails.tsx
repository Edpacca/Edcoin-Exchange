import { DirectionType } from "../../models/directionType";
import { Order } from "../../models/order";
import dateFormat from "dateformat"

export function RenderOrderDetails(order: Order) {
    
    const time = renderRow({name: "Time", data: dateFormat(order.orderTime)});    
    const direction = renderRow({name: "Direction", data: order.direction});    
    const price = renderRow({name: "Price", data: order.price});    
    const quantity = renderRow({name: "Quantity", data: order.quantity});    

    return (
        <table className="table-order">
            <tbody>
                {time}
                {direction}
                {price}
                {quantity}
            </tbody>
        </table>
    )
}

function renderRow(props: {name: string, data: string | DirectionType | number}) {
    return (
        <tr>
            <td className="table-label">{props.name}</td>
            <td className="table-data">{props.data}</td>
        </tr>
    )
}