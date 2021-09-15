import { useState, ChangeEvent } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { AccountBalanceWallet, ListAlt } from '@material-ui/icons';
import { Order } from '../../models/order';
import { FilterState } from '../filters/filterSlice';
import { FilterDispatchProps } from '../../models/filterDispatchProps';
import { BooksBrowser } from './BooksBrowser';
import { BookType } from '../../models/bookType';
import { Trade } from '../../models/trade';

export function PublicNavbar(props: 
    {
        orders: Order[],
        trades: Trade[],
        dispatches: FilterDispatchProps,
        filters: FilterState,
    }) {

    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (
        event: ChangeEvent<{}>, 
        value: number) => {
        setActiveTab(value);
    };

    return (
        <div className="panel">
                <Tabs
                value={activeTab}
                onChange={handleChange}
                variant='fullWidth'
                indicatorColor='primary'
                textColor='primary'
                aria-label='icon label tabs example'
                >
                    <Tab icon={<ListAlt />} label='PUBLIC ORDERS' />
                    <Tab icon={<AccountBalanceWallet />} label='TRADE HISTORY' />
                </Tabs>
                <div className="inner">
                    {
                        activeTab === 0 &&
                        (<BooksBrowser 
                            values={props.orders}
                            bookType={BookType.Orders}
                            dispatches={props.dispatches}
                            filters={props.filters}
                            isPrivate={false}/>)
                    }
                    {
                        activeTab === 1 &&
                        (<BooksBrowser 
                            values={props.trades}
                            bookType={BookType.Trades}
                            dispatches={props.dispatches}
                            filters={props.filters}
                            isPrivate={false}/>)
                    }
                </div>
        </div>
    )
}