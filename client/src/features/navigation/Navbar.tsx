import React from "react";
import { Tab, Tabs, Paper, makeStyles } from '@material-ui/core';
import { AccountBalanceWallet, ListAlt, MonetizationOn } from "@material-ui/icons";
import { OrderUI } from '../orderer/Orderer';
import { Counter } from '../counter/Counter';
import { UserOrders } from '../userAccount/UserOrders';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppTheme } from '../../themes/mainTheme';
import { OrderBrowser } from "../userAccount/OrderBrowser";


const pages = [
    <OrderUI />,
    <OrderBrowser />,
    <Counter />
]

let activeTab = pages[0]

export function Navbar() {

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
                <Tab icon={<AccountBalanceWallet />} label="TRADE HISTORY" />
            </Tabs>
            <div>
                {activeTab}
            </div>
        </Paper>
        </ThemeProvider>
    )
}