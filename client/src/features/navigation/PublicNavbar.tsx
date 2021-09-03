import { useState, ChangeEvent} from "react";
import { Tab, Tabs, Paper } from '@material-ui/core';
import { AccountBalanceWallet, ListAlt } from "@material-ui/icons";
import { ThemeProvider } from '@material-ui/core/styles';
import { AppTheme } from '../../themes/theme';
import { FilterDispatchProps, OrderBrowser } from "../orders/orderBooks/OrderBrowser";
import { TradeBrowser } from "../trades/TradeBrowser";
import { Order } from "../../models/order";

export function PublicNavbar(props: {orders: Order[], dispatches: FilterDispatchProps}) {

    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (
        event: ChangeEvent<{}>, 
        value: number) => {
        setActiveTab(value);
    };

    return (
        <ThemeProvider theme={AppTheme}>
        <Paper>
            <Tabs
            value={activeTab}
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
                {
                    activeTab === 0 &&
                    (<OrderBrowser 
                        orders={props.orders}
                        dispatches={props.dispatches}/>)
                }
                {
                    activeTab === 1 &&
                    (<TradeBrowser/>)
                }
            </div>
        </Paper>
        </ThemeProvider>
    )
}