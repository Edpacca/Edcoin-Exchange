import './styles/app.css';
import { store } from './store';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppTheme } from '../styles/theme';
import { PrivateNavbar } from '../features/navigation/PrivateNavbar';
import { PublicNavbar } from '../features/navigation/PublicNavbar';
import { fetchOrders, selectFilteredPublicOrders, selectFilteredOrdersByUser } from '../features/orders/orderSlice';
import { fetchTrades, selectFilteredPublicTrades, selectFilteredTradesByUser } from '../features/trades/tradeSlice';
import { loginUser, createUser, selectActiveUser, selectLoginStatus } from '../features/users/userSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { UserAccount } from '../models/userAccount';
import { MarketType } from '../models/marketType';
import { ExchangeType } from '../models/exchangeType';
import { logout } from '../features/users/userSlice';
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
import { AuthenticationRequest } from '../models/authenticationRequest';
import { fetchSiteToken, selectInitialisationStatus } from './initialisationSlice';

async function initialiseSite() {
  await store.dispatch(fetchSiteToken({
    username: 'website',
    password: 'website'
  })).then(() => {
    const token = store.getState().initialisation.siteToken;
    if (token) {
      store.dispatch(fetchOrders(token));
      store.dispatch(fetchTrades(token));
    }
  });
}

initialiseSite();

function App() {

  const userOrders: Order[] = useAppSelector(selectFilteredOrdersByUser);
  const userTrades: Trade[] = useAppSelector(selectFilteredTradesByUser);
  const activeUser: UserAccount | undefined = useAppSelector(selectActiveUser);
  const privateFilters: FilterState = useAppSelector(selectPrivateFilters);

  const publicOrders: Order[] = useAppSelector(selectFilteredPublicOrders);
  const publicTrades: Trade[] = useAppSelector(selectFilteredPublicTrades);
  const publicFilters: FilterState = useAppSelector(selectPublicFilters);

  const dispatch = useAppDispatch();
  const logOut = () => dispatch(logout());
  const login = (authenticationRequest: AuthenticationRequest) => dispatch(loginUser(authenticationRequest));
  const createUserAccount = (authenticationRequest: AuthenticationRequest) => dispatch(createUser(authenticationRequest));
  const loginStatus: 'idle' | 'loading' | 'failed' = useAppSelector(selectLoginStatus);
  const createNewOrder = (order: OrderRequest) => dispatch(createOrder(order));
  const hasActiveUser = useAppSelector(selectActiveUser) ? true : false;
  const isConnected = useAppSelector(selectInitialisationStatus) === 'idle';

  const filterDispatchesPublic: FilterDispatchProps = { 
    filterPrice: (range: number[]) => dispatch(priceFilterChangedPublic(range)),
    filterQuantity: (range: number[]) => dispatch(quantityFilterChangedPublic(range)), 
    changeAccountType: (account: MarketType) => dispatch(accountFilterChangedPublic(account)), 
    changeDirectionType: (direction: ExchangeType) => dispatch(directionTypeChangedPublic(direction)) 
  }
  const filterDispatchesUser: FilterDispatchProps = {
     filterPrice: (range: number[]) => dispatch(priceFilterChangedPrivate(range)), 
     filterQuantity: (range: number[]) => dispatch(quantityFilterChangedPrivate(range)), 
     changeAccountType: (account: MarketType) => dispatch(accountFilterChangedPrivate(account)), 
     changeDirectionType: (direction: ExchangeType) => dispatch(directionTypeChangedPrivate(direction)) 
  }
  const userDispatches: UserDispatchProps = { logOut, login, createUserAccount }

  return (
    <div>
      <ThemeProvider theme={AppTheme}>
        <div className='app-container'>
          <TopBar
            hasActiveUser={hasActiveUser}
            activeUserName={activeUser?.name}
            logOut={logOut}/>
            <div className='panel-container'>
              <div className='private' >
              <PrivateNavbar 
                  orders={userOrders}
                  trades={userTrades}
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
                  isConnected={isConnected}
                />
                </div>
            </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
