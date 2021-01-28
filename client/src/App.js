import 'react-perfect-scrollbar/dist/css/styles.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Switch, useRoutes } from "react-router-dom";
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
import CustomerListView from './views/customer/CustomerListView';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  }
}));

const App = () => {
  // const routing = useRoutes(routes);
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* {routing} */}
      <Router>
          <Routes>
            <Route path="/" element={<AppLayout isDashboardLayout={false}/>}>
              <Route path="/" element={<Navigate to="/app/dashboard" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route path="/app" element={<AppLayout isDashboardLayout/>}>
              <Route path="/dashboard" element={<DashboardView />} />
              <Route path="/assignments" element={<CustomerListView />} />
              <Route path="/account" element={<AccountView />} />
              <Route path="/bookmarks" element={<ProductListView />} />
              <Route path="/setting" element={<SettingsView/>} />
            </Route>

            <Route path="*" element={<NotFoundView />} />
          </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
