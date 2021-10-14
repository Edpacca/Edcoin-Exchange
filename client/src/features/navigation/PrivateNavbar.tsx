import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { AccountBalanceWallet, ListAlt, MonetizationOn } from '@material-ui/icons';
import { OrderMaker } from '../orders/OrderMaker/OrderMaker';
import { Order } from '../../models/order';
import { UserLogin } from '../users/UserLogin';
import { OrderRequest } from '../../models/orderRequest';
import { FilterState } from '../filters/filterSlice';
import { FilterDispatchProps } from '../../models/filterDispatchProps';
import { UserDispatchProps } from '../../models/userDispatchProps';
import { BooksBrowser } from './BooksBrowser';
import { BookType } from '../../models/bookType';
import { Trade } from '../../models/trade';
import { UserAccount } from '../../models/userAccount';
import { Status } from '../../models/status';

export function PrivateNavbar(props: {
        orders: Order[],
        trades: Trade[],
        userDispatches: UserDispatchProps,
        filterDispatches: FilterDispatchProps,
        filters: FilterState,
        activeUser: UserAccount | undefined,
        loginStatus: Status,
        orderStatus: Status,
        createOrder: (order: OrderRequest) => Promise<any>,
    }) {

    const [activeTab, setActiveTab] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
        setActiveTab(value);
    };

    return (
        <div className="panel">
            {
                props.activeUser &&
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
            }
            <div>
                {
                    !props.activeUser &&
                    (<UserLogin
                        loginDispatch={props.userDispatches.login}
                        createUserDispatch={props.userDispatches.createUserAccount}
                        loginStatus={props.loginStatus}/>)
                }
                {
                    activeTab === 0 && props.activeUser &&
                    (<OrderMaker 
                        createOrder={props.createOrder}
                        activeUser={props.activeUser}
                        orderStatus={props.orderStatus}
                    />)
                }
                { 
                    activeTab === 1 && props.activeUser &&
                    (<BooksBrowser 
                        values={props.orders}
                        bookType={BookType.Orders}
                        dispatches={props.filterDispatches}
                        filters={props.filters}
                        isPrivate={true}/>)
                }
                {
                    activeTab === 2 && props.activeUser &&
                    (<BooksBrowser 
                        values={props.trades}
                        bookType={BookType.Trades}
                        dispatches={props.filterDispatches}
                        filters={props.filters}
                        isPrivate={true}/>)
                }
            </div>
        </div>
    )
}
