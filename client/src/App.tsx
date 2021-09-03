import './App.css';
import logo from './logo.svg';
import { store } from './app/store';
import { UserDispatchProps, UserNavbar } from './features/navigation/UserNavbar';
import { PublicNavbar } from './features/navigation/PublicNavbar';
import { fetchOrders, selectFilteredOrders, selectFilteredOrdersByUser } from './features/orders/orderSlice';
import { fetchTrades } from './features/trades/tradeSlice';
import { fetchUsers, selectUsers } from './features/users/userSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Order } from './models/order';
import { UserAccount } from './models/userAccount';
import { AccountType } from './models/accountType';
import { DirectionType } from './models/directionType';
import { FilterDispatchProps } from './features/orders/orderBooks/OrderBrowser';
import { newUserSelected } from './features/users/userSlice';
import {    
  directionTypeChanged,
  accountFilterChanged,
  priceFilterChanged,
  quantityFilterChanged 
} from './features/filters/filterSlice';
import { OrderRequest } from './models/orderRequest';
import { createOrder } from './features/orders/orderSlice';

store.dispatch(fetchOrders());
store.dispatch(fetchTrades());
store.dispatch(fetchUsers());

function App() {

  const userOrders: Order[] = useAppSelector(selectFilteredOrdersByUser);
  const publicOrders: Order[] = useAppSelector(selectFilteredOrders);
  const users: UserAccount[] = useAppSelector(selectUsers);

  const dispatch = useAppDispatch();
  const logOut = (user: undefined) => dispatch(newUserSelected(user));
  const changeUser = (user: UserAccount) => dispatch(newUserSelected(user));
  const filterPrice = (range: number[]) => dispatch(quantityFilterChanged(range));
  const filterQuantity = (range: number[]) => dispatch(priceFilterChanged(range));
  const changeAccountType = (account: AccountType) => dispatch(accountFilterChanged(account));
  const changeDirectionType = (direction: DirectionType) => dispatch(directionTypeChanged(direction));
  const createNewOrder = (order: OrderRequest) => dispatch(createOrder(order))

  const filterDispatches: FilterDispatchProps = { filterPrice, filterQuantity, changeAccountType, changeDirectionType }
  const userDispatches: UserDispatchProps = { logOut, changeUser }

  return (
    <div>
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="split-sections">
            <div className="private-area" >
              <UserNavbar 
                orders={userOrders}
                users={users}
                userDispatches={userDispatches}
                filterDispatches={filterDispatches}
                createOrder={createNewOrder}
                />
            </div>
            <div className="public-area">
              <PublicNavbar
                orders={publicOrders}
                dispatches={filterDispatches}
              />
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
