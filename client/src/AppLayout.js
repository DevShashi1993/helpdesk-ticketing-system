import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
// import NavigationBar from "./components/NavigationBar/NavigationBar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";

const AppLayout = () => {
  return (
    <>
      <header>
        <Router>{/* <NavigationBar /> */}</Router>
      </header>

      <main>
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={LoginPage} />
            <Route
              render={function () {
                return <h1>Not Found</h1>;
              }}
            />
          </Switch>
        </Container>
      </main>
    </>
  );
};

export default AppLayout;
