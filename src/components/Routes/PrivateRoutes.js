import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import Dasshboard from '../Dashboard/Dashboard';
import User from '../User/User';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Footer from '../Layout/Footer';
import {
  APP_ROUTE_BANK_ACCOUNT_PATH,
  APP_ROUTE_DASHBOARD_PATH,
  APP_ROUTE_USERS_PATH
} from '../../common/AppConstant';
import BankAccount from '../BankAccount/BankAccount';


const PrivateRoutes = () => {

  const { isAuthenticated } = useSelector((state) => state.auth);


  const history = useHistory();

  if (!isAuthenticated) {
    history.push('/')
  }


  return (


    <div id='app'>
      <div className='main-wrapper main-wrapper-1'>
        <div className='navbar-bg'></div>
        <Header />
        <Sidebar />
        <Route exact path={APP_ROUTE_DASHBOARD_PATH}>
          <Dasshboard />
        </Route>
        <Route exact path={APP_ROUTE_USERS_PATH}>
          <User />
        </Route>
        <Route exact path={APP_ROUTE_BANK_ACCOUNT_PATH}>
          <BankAccount />
        </Route>
        <Footer />
      </div>
    </div>
  );

}

export default PrivateRoutes;