export function RenderOrderDetails(props: any) {
    
    const time = renderRow({name: "Time", data: props.orderTime});    
    const direction = renderRow({name: "Direction", data: props.direction});    
    const price = renderRow({name: "Price", data: props.price});    
    const quantity = renderRow({name: "Quantity", data: props.quantity});    

    return (
        <table className="table-order">
            {time}
            {direction}
            {price}
            {quantity}
        </table>
    )
}

function renderRow(props: any) {
    return (
        <tr>
            <td className="table-label">{props.name}</td>
            <td className="table-data">{props.data}</td>
        </tr>
    )
}