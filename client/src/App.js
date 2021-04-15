import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import AccountView from './views/AccountView';
import DashboardView from './views/DashboardView';
import NotFoundView from './views/NotFoundView';
import BookmarkView from './views/BookmarkView';
import SettingsView from './views/SettingsView';
import Register from './components/Register/Register';
import Login from './components//Login/Login';
import AppLayout from './AppLayout';
import './mixins/chartjs';
import theme from './theme';
import TicketsView from './views/TicketsView';
import ContactListView from './views/customer/ContactListView';
import setJWTToken from './utilities/setJWTToken';
import { SET_CURRENT_USER } from './store/actions/types';
import { logout } from './store/actions/authActions';

const jwtToken = localStorage.jwtToken;

// const useStyles = makeStyles(theme => ({
//   root: {
//     backgroundColor: theme.palette.background.default,
//     display: 'flex',
//     height: '100%',
//     overflow: 'hidden',
//     width: '100%',
//     paddingTop: '20px'
//   }
// }));

const App = () => {
  // const routing = useRoutes(routes);
  const dispatch = useDispatch();
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
  }, [dispatch]);

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
            <Route path="/bookmarks" element={<BookmarkView />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="*" element={<NotFoundView />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
