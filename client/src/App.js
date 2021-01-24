import React from 'react';
// import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
// import Header from './components/Layout/Header';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import Login from './components//Login/Login';
// import jwt_decode from 'jwt-decode';
// import setJWTToken from './securityUtils/setJWTToken';
// import { SET_CURRENT_USER } from './actions/types';
// import { logout } from './actions/securityActions';
import SecuredRoute from "./securityUtils/SecureRoute";

const jwtToken = localStorage.jwtToken

// if (jwtToken) {
//   setJWTToken(jwtToken);

//   const decoded_jwtToken = jwt_decode(jwtToken);
//   store.dispatch({
//     type: SET_CURRENT_USER,
//     payload: decoded_jwtToken
//   });

//   const currentTime = Date.now() / 1000;

//   if (decoded_jwtToken.exp < currentTime) {
//     store.dispatch(logout())
//     window.location.href = "/";
//   }
// }



const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container-fluid">
        
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />

          {/* <Switch>
            <SecuredRoute exact path="/dashboard" component={Dashboard} />
          </Switch> */}
        </div>
      </Router>
    </Provider>
  );
}

export default App;