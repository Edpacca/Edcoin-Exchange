import { useSelector, useDispatch } from "react-redux";
import { selectOrders } from "../../app/orderSlice";
import { Button, Checkbox, Slider } from "@material-ui/core";
import { UserOrders } from "./UserOrders";

export function OrderBrowser() {

    const stateOrders = useSelector(selectOrders);

    const heading = `MY ORDERS (${stateOrders.length})`

        return (
        <div>
            <h2>{heading}</h2>
            <div className="filter-grid-main">
                <h3 className="r-align">BUY</h3>
                <Checkbox color="primary"/>
                <h3 className="r-align">PRICE&nbsp;&nbsp;</h3>
                <Slider className="slider"
                    defaultValue={15.00}
                    step={0.01}
                    min={0.00}
                    max={100}
                    // value={price}
                    // onChange={handleSliderPriceChange}
                />
            </div>
            <div className="filter-grid-main">
                <h3 className="r-align">SELL</h3>
                <Checkbox color="primary"/>
                <h3 className="r-align">QUANTITY&nbsp;&nbsp;</h3>
                <Slider className="slider"
                    defaultValue={15.00}
                    step={0.01}
                    min={0.00}
                    max={100}
                    // value={price}
                    // onChange={handleSliderPriceChange}
                />
            </div>
            <UserOrders orders={stateOrders}/>
        </div>
    )
}