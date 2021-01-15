import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";
import configureStore from "./store/configureStore";
import "./index.css";
import AppLayout from "./AppLayout";

// Create browser history to use in the Redux store
//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createBrowserHistory();

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <AppLayout />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
