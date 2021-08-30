import React from "react";
import { Tab, Tabs, Paper } from '@material-ui/core';
import { AccountBalanceWallet, ListAlt, MonetizationOn } from "@material-ui/icons";
import { OrderMaker } from '../orderMaker/OrderMaker';
import { Counter } from '../counter/Counter';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppTheme } from '../../themes/theme';
import { OrderBrowser } from "../orderBooks/OrderBrowser";

const pages = [
    <OrderMaker/>,
    <OrderBrowser/>,
    <Counter/>
]

let activeTab = pages[0]

export function UserNavbar() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        activeTab = pages[newValue];
    };

    return (
        <ThemeProvider theme={AppTheme}>
        <Paper>
            <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon label tabs example"
            >
                <Tab icon={<MonetizationOn />} label="NEW ORDER" />
                <Tab icon={<ListAlt />} label="ACTIVE ORDERS" />
                <Tab icon={<AccountBalanceWallet />} label="MY TRADES" />
            </Tabs>
            <div>
                {activeTab}
            </div>
        </Paper>
        </ThemeProvider>
    )
}