import './App.css';
import logo from './logo.svg';
import { store } from './app/store';
import { PrivateNavbar } from './features/navigation/PrivateNavbar';
import { PublicNavbar } from './features/navigation/PublicNavbar';
import { fetchOrders, selectFilteredPublicOrders, selectFilteredOrdersByUser } from './features/orders/orderSlice';
import { fetchTrades, selectFilteredPublicTrades, selectFilteredTradesByUser } from './features/trades/tradeSlice';
import { fetchUsers, selectUsers } from './features/users/userSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { UserAccount } from './models/userAccount';
import { AccountType } from './models/accountType';
import { DirectionType } from './models/directionType';
import { newUserSelected } from './features/users/userSlice';
import { OrderRequest } from './models/orderRequest';
import { createOrder } from './features/orders/orderSlice';
import { FilterDispatchProps } from './models/filterDispatchProps';
import {    
  directionTypeChangedPublic,
  accountFilterChangedPublic,
  priceFilterChangedPublic,
  quantityFilterChangedPublic,
  directionTypeChangedPrivate,
  accountFilterChangedPrivate,
  priceFilterChangedPrivate,
  quantityFilterChangedPrivate,
  selectPrivateFilters,
  selectPublicFilters,
  FilterState,
} from './features/filters/filterSlice';
import { Order } from './models/order';
import { Trade } from './models/trade';
import { UserDispatchProps } from './models/userDispatchProps';

store.dispatch(fetchOrders());
store.dispatch(fetchTrades());
store.dispatch(fetchUsers());

function App() {

  const userOrders: Order[] = useAppSelector(selectFilteredOrdersByUser);
  const userTrades: Trade[] = useAppSelector(selectFilteredTradesByUser);
  const users: UserAccount[] = useAppSelector(selectUsers);
  const userFilters: FilterState = useAppSelector(selectPrivateFilters);

  const publicOrders: Order[] = useAppSelector(selectFilteredPublicOrders);
  const publicTrades: Trade[] = useAppSelector(selectFilteredPublicTrades);
  const publicFilters: FilterState = useAppSelector(selectPublicFilters);

  const dispatch = useAppDispatch();
  const logOut = () => dispatch(newUserSelected(undefined));
  const changeUser = (user: UserAccount) => dispatch(newUserSelected(user));
  const createNewOrder = (order: OrderRequest) => dispatch(createOrder(order));

  const filterDispatchesPublic: FilterDispatchProps = { 
    filterPrice: (range: number[]) => dispatch(priceFilterChangedPublic(range)),
    filterQuantity: (range: number[]) => dispatch(quantityFilterChangedPublic(range)), 
    changeAccountType: (account: AccountType) => dispatch(accountFilterChangedPublic(account)), 
    changeDirectionType: (direction: DirectionType) => dispatch(directionTypeChangedPublic(direction)) 
  }
  const filterDispatchesUser: FilterDispatchProps = {
     filterPrice: (range: number[]) => dispatch(priceFilterChangedPrivate(range)), 
     filterQuantity: (range: number[]) => dispatch(quantityFilterChangedPrivate(range)), 
     changeAccountType: (account: AccountType) => dispatch(accountFilterChangedPrivate(account)), 
     changeDirectionType: (direction: DirectionType) => dispatch(directionTypeChangedPrivate(direction)) 
  }
  const userDispatches: UserDispatchProps = { logOut, changeUser }

  return (
    <div>
      <div className='App'>
          <img src={logo} className='App-logo' alt='logo' />
          <div className='split-sections'>
            <div className='private-area' >
            <PrivateNavbar 
                orders={userOrders}
                trades={userTrades}
                users={users}
                userDispatches={userDispatches}
                filterDispatches={filterDispatchesUser}
                filters={userFilters}
                createOrder={createNewOrder}
                />
            </div>
            <div className='public-area'>
              <PublicNavbar
                orders={publicOrders}
                trades={publicTrades}
                dispatches={filterDispatchesPublic}
                filters={publicFilters}
              />
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
