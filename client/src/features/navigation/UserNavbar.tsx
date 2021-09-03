import React from "react";
import { Tab, Tabs, Paper, Button } from '@material-ui/core';
import { AccountBalanceWallet, ListAlt, MonetizationOn } from "@material-ui/icons";
import { OrderMaker } from '../orders/orderMaker/OrderMaker';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppTheme } from '../../themes/theme';
import { OrderBrowser, FilterDispatchProps } from "../orders/orderBooks/OrderBrowser";
import { TradeBrowser } from "../trades/TradeBrowser";
import { Order } from "../../models/order";
import { store } from "../../app/store";
import { UserLogin } from "../users/UserLogin";
import { UserAccount } from "../../models/userAccount";
import { OrderRequest } from "../../models/orderRequest";

export interface UserDispatchProps {
    logOut: (user: undefined) => void;
    changeUser: (user: UserAccount) => void;
}

export function UserNavbar(props: 
    {
        orders: Order[],
        users: UserAccount[],
        userDispatches: UserDispatchProps,
        filterDispatches: FilterDispatchProps
        createOrder: (order: OrderRequest) => Promise<any>;
    }) {

    const [activeTab, setActiveTab] = React.useState(0);
    const hasActiveUser = store.getState().users.activeUser ? true : false;

    const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
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
                <Tab icon={<MonetizationOn />} label="NEW ORDER" />
                <Tab icon={<ListAlt />} label="ACTIVE ORDERS" />
                <Tab icon={<AccountBalanceWallet />} label="MY TRADES" />
            </Tabs>
            <div>
                {
                    !hasActiveUser &&
                    (<UserLogin 
                        users={props.users}
                        changeUserDispatch={props.userDispatches.changeUser}/>)
                }
                {
                    activeTab === 0 && hasActiveUser &&
                    (<OrderMaker createOrder={props.createOrder}/>)
                }
                { 
                    activeTab === 1 && hasActiveUser &&
                    (<OrderBrowser 
                        orders={props.orders}
                        dispatches={props.filterDispatches}/>)
                }
                {
                    activeTab === 2 && hasActiveUser &&
                    (<TradeBrowser/>)
                }
            </div>
        </Paper>
        {hasActiveUser ? <Button onClick={() => props.userDispatches.logOut(undefined)}>LOG OUT</Button> : undefined}
        </ThemeProvider>
    )
}
