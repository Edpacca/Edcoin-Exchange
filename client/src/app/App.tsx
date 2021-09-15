import './styles/app.css';
import { store } from './store';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppTheme } from '../styles/theme';
import { PrivateNavbar } from '../features/navigation/PrivateNavbar';
import { PublicNavbar } from '../features/navigation/PublicNavbar';
import { fetchOrders, selectFilteredPublicOrders, selectFilteredOrdersByUser } from '../features/orders/orderSlice';
import { fetchTrades, selectFilteredPublicTrades, selectFilteredTradesByUser } from '../features/trades/tradeSlice';
import { fetchUsers, loginUser, selectActiveUser, selectLoginStatus, selectUsers } from '../features/users/userSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { UserAccount } from '../models/userAccount';
import { AccountType } from '../models/accountType';
import { DirectionType } from '../models/directionType';
import { newUserSelected } from '../features/users/userSlice';
import { OrderRequest } from '../models/orderRequest';
import { createOrder } from '../features/orders/orderSlice';
import { FilterDispatchProps } from '../models/filterDispatchProps';
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
} from '../features/filters/filterSlice';
import { Order } from '../models/order';
import { Trade } from '../models/trade';
import { UserDispatchProps } from '../models/userDispatchProps';
import { TopBar } from '../features/navigation/TopBar';

store.dispatch(fetchOrders());
store.dispatch(fetchTrades());
store.dispatch(fetchUsers());

function App() {

  const userOrders: Order[] = useAppSelector(selectFilteredOrdersByUser);
  const userTrades: Trade[] = useAppSelector(selectFilteredTradesByUser);
  const users: UserAccount[] = useAppSelector(selectUsers);
  const privateFilters: FilterState = useAppSelector(selectPrivateFilters);

  const publicOrders: Order[] = useAppSelector(selectFilteredPublicOrders);
  const publicTrades: Trade[] = useAppSelector(selectFilteredPublicTrades);
  const publicFilters: FilterState = useAppSelector(selectPublicFilters);

  const dispatch = useAppDispatch();
  const logOut = () => dispatch(newUserSelected(undefined));
  // const changeUser = (user: UserAccount) => dispatch(newUserSelected(user));
  const loginStatus: 'idle' | 'loading' | 'failed' = useAppSelector(selectLoginStatus);
  const changeUser = (user: UserAccount) => dispatch(loginUser(user));
  const createNewOrder = (order: OrderRequest) => dispatch(createOrder(order));
  const hasActiveUser = useAppSelector(selectActiveUser) ? true : false;

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
      <ThemeProvider theme={AppTheme}>
        <div className='app-container'>
          <TopBar
            hasActiveUser={hasActiveUser}
            logOut={logOut}/>
            <div className='panel-container'>
              <div className='private' >
              <PrivateNavbar 
                  orders={userOrders}
                  trades={userTrades}
                  users={users}
                  userDispatches={userDispatches}
                  filterDispatches={filterDispatchesUser}
                  filters={privateFilters}
                  hasActiveUser={hasActiveUser}
                  createOrder={createNewOrder}
                  loginStatus={loginStatus}
                  />
              </div>
              <div className='public'>
                <PublicNavbar
                  orders={publicOrders}
                  trades={publicTrades}
                  dispatches={filterDispatchesPublic}
                  filters={publicFilters}
                />
              </div>
            </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
