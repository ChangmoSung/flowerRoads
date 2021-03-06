import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./components/styles/styles.scss";
import PrivateRoute from "./components/routing/PrivateRoute/index.js";
import ChangeLangButtons from "./components/layout/ChangeLangButtons/index.js";
import Alerts from "./components/layout/Alerts/index.js";
import NavBar from "./components/layout/NavBar/index.js";
import MainPage from "./components/layout/MainPage/index.js";
import SignInPage from "./components/layout/SignInPage/index.js";
import SignUpPage from "./components/layout/SignUpPage/index.js";
import Foods from "./components/layout/Foods/index.js";
import Chemotherapies from "./components/layout/Chemotherapies/index.js";
import SideEffects from "./components/layout/SideEffects/index.js";
import MethodsOfPrevention from "./components/layout/MethodsOfPrevention/index.js";
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import background from "./images/flowers.png";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ChangeLangButtons />
        <PrivateRoute component={NavBar} />
        <div className="wrapper">
          <Alerts />
          <Route exact path="/" component={SignInPage} />
          <Switch>
            <Route exact path="/signUpPage" component={SignUpPage} />
            <PrivateRoute exact path="/mainPage" component={MainPage} />
            <PrivateRoute exact path="/foods" component={Foods} />
            <PrivateRoute
              exact
              path="/chemotherapies"
              component={Chemotherapies}
            />
            <PrivateRoute exact path="/sideEffects" component={SideEffects} />
            <PrivateRoute
              exact
              path="/methodsOfprevention"
              component={MethodsOfPrevention}
            />
          </Switch>
          <div className="background">
            <img src={background} />
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
