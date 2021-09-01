import { Slider } from "@material-ui/core";
import { useState } from "react";
import { useAppSelector } from '../../app/hooks';
import { DropDownSelect } from "../generic/DropdownSelect";
import { GetAllAccountTypes, AccountType } from '../../models/accountType';
import { selectTrades } from "./tradeSlice";
import { TradesBook } from "./TradesBook";
import { Trade } from "../../models/trade";
import { rangeFilter } from "../../utilities/utilities";

export function TradeBrowser() {

    const stateTrades: Trade[] = useAppSelector(selectTrades);
    const [trades, setTrades] = useState(stateTrades);
    const [price, setPrice] = useState<number[]>([0, 100]);
    const [quantity, setQuantity] = useState<number[]>([0, 100]);
    const [accountTypeFilter, setAccountTypeFilter] = useState<string>("All");
    const selectAccount: string[] = [ "All" ].concat(GetAllAccountTypes());

    const handlePriceChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
        const range = newValue as number[]
        setPrice(range);
        setTrades(stateTrades.filter(
            trade => rangeFilter(
                trade.price,
                range[0],
                range[1])));
    };

    const handleQuantityChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
        const range = newValue as number[]
        setQuantity(range as number[]);
        setTrades(stateTrades.filter(
            trade => rangeFilter(
                trade.quantity,
                range[0],
                range[1])));
    };

    const handleDropDownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "All") {
            setTrades(stateTrades);
            setAccountTypeFilter(event.target.value);
        } else {
            const account: AccountType = event.target.value + "-EDC" as AccountType;
            setTrades(stateTrades.filter(trade => trade.account === account));
            setAccountTypeFilter(account);
        }
    }

    let searchCriteria = `${accountTypeFilter} trades (${trades.length})`;

        return (
        <div>
            <br/>
            <h4>ACCOUNT</h4>
            <DropDownSelect 
                values={selectAccount}
                id={"selectAccount"}
                onChange={e => handleDropDownChange(e)}/>
            <div className="slider">
                <h4>PRICE</h4>
                <Slider 
                value={price}
                step={0.1}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                />
                <h4>QUANTITY</h4>
                <Slider
                value={quantity}
                step={1}
                onChange={handleQuantityChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                />
            </div>
            <br/>
            <p>Searching {searchCriteria}</p>
            <TradesBook trades={trades}/>
            <br/>
        </div>
    )
}