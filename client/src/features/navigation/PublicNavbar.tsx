import { useState, ChangeEvent} from "react";
import { Tab, Tabs, Paper } from '@material-ui/core';
import { AccountBalanceWallet, ListAlt } from "@material-ui/icons";
import { ThemeProvider } from '@material-ui/core/styles';
import { AppTheme } from '../../themes/theme';
import { OrderBrowser } from "../orders/orderBooks/OrderBrowser";
import { selectOrdersById } from "../orders/orderSlice";
import { TradeBrowser } from "../trades/TradeBrowser";

const pages = [
    <OrderBrowser
    orderSelector={selectOrdersById}/>,
    <TradeBrowser/>
]

let activeTab = pages[0]

export function PublicNavbar() {

    const [value, setValue] = useState(0);

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
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
                <Tab icon={<ListAlt />} label="PUBLIC ORDERS" />
                <Tab icon={<AccountBalanceWallet />} label="TRADE HISTORY" />
            </Tabs>
            <div>
                {activeTab}
            </div>
        </Paper>
        </ThemeProvider>
    )
}