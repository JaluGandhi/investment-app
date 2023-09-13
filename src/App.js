import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login'
import PrivateRoutes from './components/Routes/PrivateRoutes';
import ResetPassword from './components/Auth/ResetPassword';
import {
  APP_ROUTE_LOGIN_PATH,
  APP_ROUTE_REST_PASSWORD_PATH,
  APP_ROUTE_BANK_ACCOUNT_PATH,
  APP_ROUTE_BROKER_PATH,
  APP_ROUTE_DASHBOARD_PATH,
  APP_ROUTE_DEMAT_ACCOUNT_PATH,
  APP_ROUTE_DEPOSITORY_PARTICIPANT_PATH,
  APP_ROUTE_SCRIPT_PATH,
  APP_ROUTE_SCRIPT_TRANSACTION_PATH,
  APP_ROUTE_USERS_PATH,
  APP_ROUTE_USER_SCRIPT_PATH
} from './common/AppConstant';

import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dasshboard from './components/Dashboard/Dashboard';
import User from './components/User/User';
import Footer from './components/Layout/Footer';


import BankAccount from './components/BankAccount/BankAccount';
import Broker from './components/Demat/Broker';
import DepositoryParticipant from './components/Demat/DepositoryParticipant';
import DematAccount from './components/Demat/DematAccount';
import UserScript from './components/Script/UserScript';
import Script from './components/Script/Script';
import ScriptTransaction from './components/Script/ScriptTransaction';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={APP_ROUTE_LOGIN_PATH} element={<Login />} />
        <Route exact path={APP_ROUTE_REST_PASSWORD_PATH} element={<ResetPassword />} />


        {/* <Route component={<PrivateRoutes/>} /> */}

        <Route path='/' element={<PrivateRoutes />}>
          <Route exact path={APP_ROUTE_DASHBOARD_PATH} element={<Dasshboard />} />
          <Route exact path={APP_ROUTE_USERS_PATH} element={<User />} />
          <Route exact path={APP_ROUTE_BANK_ACCOUNT_PATH} element={<BankAccount />} />
          <Route exact path={APP_ROUTE_DEMAT_ACCOUNT_PATH} element={<DematAccount />} />
          <Route exact path={APP_ROUTE_DEPOSITORY_PARTICIPANT_PATH} element={<DepositoryParticipant />} />
          <Route exact path={APP_ROUTE_BROKER_PATH} element={<Broker />} />
          <Route exact path={APP_ROUTE_SCRIPT_TRANSACTION_PATH} element={<ScriptTransaction />} />
          <Route exact path={APP_ROUTE_USER_SCRIPT_PATH} element={<UserScript />} />
          <Route exact path={APP_ROUTE_SCRIPT_PATH} element={<Script />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
