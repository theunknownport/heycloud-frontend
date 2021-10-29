

import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
// import Home from "./components/Home";
// import Profile from "./components/Profile";
// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import VPS from "./pages/Vps";



const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <>
    <AuthVerify logOut={logOut}/>
    <Router history={history}>
      <Switch>
        <Route exact path="/logout"
          component={() => {
            logOut()
            return (
              <Redirect to="/" />
            )
          }}  
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/reset-password" component={() => <ForgotPassword view="reset-password"/>}/>
        <Route exact path="/forgot-password" component={() => <ForgotPassword view="send-code"/>}/>
        <Route exact path="/homepage"
          component={() => {global.window && (global.window.location.href = 'https://heycloud.webflow.io');
            
            return null;
          } } />
        <Route exact path="/" 
          component={() => {
            global.window && (global.window.location.href = '/dashboard');
            return null;
        } } />


        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/vps" component={VPS} />
      </Switch>
    </Router>
    </>
  );
};
export default App;
