import React from 'react';
import { Tab, Tabs, Paper } from '@material-ui/core';
import { AccountBalanceWallet, ListAlt, MonetizationOn } from '@material-ui/icons';
import { OrderMaker } from '../orders/orderMaker/OrderMaker';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppTheme } from '../../themes/theme';
import { Order } from '../../models/order';
import { store } from '../../app/store';
import { UserLogin } from '../users/UserLogin';
import { UserAccount } from '../../models/userAccount';
import { OrderRequest } from '../../models/orderRequest';
import { LogOutButton } from './LogOutButton';
import { FilterState } from '../filters/filterSlice';
import { FilterDispatchProps } from '../../models/filterDispatchProps';
import { UserDispatchProps } from '../../models/userDispatchProps';
import { BooksBrowser } from './BooksBrowser';
import { BookType } from '../../models/bookType';
import { Trade } from '../../models/trade';

export function PrivateNavbar(props: {
        orders: Order[],
        trades: Trade[],
        users: UserAccount[],
        userDispatches: UserDispatchProps,
        filterDispatches: FilterDispatchProps
        filters: FilterState
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
            variant='fullWidth'
            indicatorColor='primary'
            textColor='primary'
            aria-label='icon label tabs example'
            >
                <Tab icon={<MonetizationOn />} label='NEW ORDER' />
                <Tab icon={<ListAlt />} label='ACTIVE ORDERS' />
                <Tab icon={<AccountBalanceWallet />} label='MY TRADES' />
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
                    (<BooksBrowser 
                        values={props.orders}
                        bookType={BookType.Orders}
                        dispatches={props.filterDispatches}
                        filters={props.filters}
                        isPrivate={true}/>)
                }
                {
                    activeTab === 2 && hasActiveUser &&
                    (<BooksBrowser 
                        values={props.trades}
                        bookType={BookType.Trades}
                        dispatches={props.filterDispatches}
                        filters={props.filters}
                        isPrivate={true}/>)
                }
            </div>
        </Paper>
        <LogOutButton
            hasActiveUser={hasActiveUser}
            logOut={props.userDispatches.logOut}/>
        </ThemeProvider>
    )
}
