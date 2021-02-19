import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Switch,
  useRoutes
} from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import AccountView from 'src/views/account/AccountView';
import DashboardView from './views/reports/DashboardView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import SettingsView from 'src/views/settings/SettingsView';
import Register from './components/Register/Register';
import Login from './components//Login/Login';
import AppLayout from './AppLayout';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import TicketsView from './views/tickets/TicketsView';
import ContactListView from './views/customer/ContactListView';
import setJWTToken from './utilities/setJWTToken';
import { SET_CURRENT_USER } from './store/actions/types';
import { logout } from './store/actions/authActions';
import SecuredRoute from './utilities/secureRoute';

const jwtToken = localStorage.jwtToken;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
    paddingTop: '20px'
  }
}));

const App = () => {
  // const routing = useRoutes(routes);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const { validToken } = useSelector(state => state.authState);
  useEffect(() => {
    if (jwtToken) {
      const userData = JSON.parse(localStorage.htsUser);
      setJWTToken(jwtToken);
      const decoded_jwtToken = jwt_decode(jwtToken);
      dispatch({
        type: SET_CURRENT_USER,
        payload: { userData, decoded_jwtToken }
      });

      const currentTime = Date.now() / 1000;

      if (decoded_jwtToken.exp < currentTime) {
        
        dispatch(logout());
        window.location.href = '/login';
      }
    }
  }, [jwtToken]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* {routing} */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !validToken ? (
                <AppLayout isDashboardLayout={false} />
              ) : (
                <Navigate to="/app/dashboard" />
              )
            }
          >
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<NotFoundView />} />
          </Route>

          <Route
            path="/app"
            element={
              validToken ? (
                <AppLayout isDashboardLayout />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/tickets" element={<TicketsView />} />
            <Route path="/contacts" element={<ContactListView />} />
            <Route path="/account" element={<AccountView />} />
            <Route path="/bookmarks" element={<ProductListView />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="*" element={<NotFoundView />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
