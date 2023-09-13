// import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from 'react-router-dom'
import { useNavigate, Outlet } from 'react-router-dom'
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { useSelector } from 'react-redux';
import Footer from '../Layout/Footer';
// import {
//   APP_ROUTE_BANK_ACCOUNT_PATH,
//   APP_ROUTE_BROKER_PATH,
//   APP_ROUTE_DASHBOARD_PATH,
//   APP_ROUTE_DEMAT_ACCOUNT_PATH,
//   APP_ROUTE_DEPOSITORY_PARTICIPANT_PATH,
//   APP_ROUTE_SCRIPT_PATH,
//   APP_ROUTE_SCRIPT_TRANSACTION_PATH,
//   APP_ROUTE_USERS_PATH,
//   APP_ROUTE_USER_SCRIPT_PATH
// } from '../../common/AppConstant';
// import Dasshboard from '../Dashboard/Dashboard';
// import User from '../User/User';
// import BankAccount from '../BankAccount/BankAccount';
// import Broker from '../Demat/Broker';
// import DepositoryParticipant from '../Demat/DepositoryParticipant';
// import DematAccount from '../Demat/DematAccount';
// import UserScript from '../Script/UserScript';
// import Script from '../Script/Script';
// import ScriptTransaction from '../Script/ScriptTransaction';


const PrivateRoutes = () => {

  const { isAuthenticated } = useSelector((state) => state.auth);


  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate.push('/')
  }


  return (


    <div id='app'>
      <div className='main-wrapper main-wrapper-1'>
        <div className='navbar-bg'></div>
        <Header />
        <Sidebar />

        <Outlet />
        {/* <Route exact path={APP_ROUTE_DASHBOARD_PATH} element={<Dasshboard />} />
        <Route exact path={APP_ROUTE_USERS_PATH} element={<User />} />
        <Route exact path={APP_ROUTE_BANK_ACCOUNT_PATH} element={<BankAccount />} />
        <Route exact path={APP_ROUTE_DEMAT_ACCOUNT_PATH} element={<DematAccount />} />
        <Route exact path={APP_ROUTE_DEPOSITORY_PARTICIPANT_PATH} element={<DepositoryParticipant />} />
        <Route exact path={APP_ROUTE_BROKER_PATH} element={<Broker />} />
        <Route exact path={APP_ROUTE_SCRIPT_TRANSACTION_PATH} element={<ScriptTransaction />} />
        <Route exact path={APP_ROUTE_USER_SCRIPT_PATH} element={<UserScript />} />
        <Route exact path={APP_ROUTE_SCRIPT_PATH} element={<Script />} /> */}
        <Footer />
      </div>
    </div>
  );

}

export default PrivateRoutes;