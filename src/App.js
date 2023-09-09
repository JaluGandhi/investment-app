import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Auth/Login'
import PrivateRoutes from './components/Routes/PrivateRoutes';
import ResetPassword from './components/Auth/ResetPassword';
import {
  APP_ROUTE_LOGIN_PATH,
  APP_ROUTE_REST_PASSWORD_PATH
} from './common/AppConstant';

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path={APP_ROUTE_LOGIN_PATH}>
          <Login />
        </Route>
        <Route exact path={APP_ROUTE_REST_PASSWORD_PATH}>
          <ResetPassword />
        </Route>


        {/* <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='reset-password'>
          <ResetPassword />
        </Route> */}


        <Route component={PrivateRoutes} />
      </Switch>
    </Router>
  );
}

export default App;
