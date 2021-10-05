import './styles/navBar.css';
import { useState, ChangeEvent } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { AccountBalanceWallet, ListAlt, SentimentDissatisfied } from '@material-ui/icons';
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
        isConnected: boolean
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
                onChange={props.isConnected ? handleChange : undefined}
                indicatorColor={props.isConnected ? 'primary' : 'secondary'}
                textColor={props.isConnected ? 'primary' : 'secondary'}
                aria-label='icon label tabs example'
                variant='fullWidth'
                >
                    <Tab icon={<ListAlt />} label='PUBLIC ORDERS' />
                    <Tab icon={<AccountBalanceWallet />} label='TRADE HISTORY' />
                </Tabs>
                {
                    props.isConnected &&
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
                }
                {
                    !props.isConnected &&
                    <div className="connectionFailed">
                        <h1>Failed to connect</h1>
                        <SentimentDissatisfied
                        fontSize='large'
                        />
                        <p>Our servers may be offline. Please try again later</p>
                    </div>
                }
        </div>
    )
}