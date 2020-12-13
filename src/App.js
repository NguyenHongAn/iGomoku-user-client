import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import "./App.css"
import AppBar from './components/AppBar/AppBar';
import HomePage from "./components/HomePage/HomePage";
import FAQ from "./components/FAQ/FAQ";
import Dashboard from './containers/Dashboard/Dashboard';

import LoginPage from './containers/Signin';
import SignupPage from './containers/Signup';
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    
    <HashRouter>
      <ToastProvider>
      <AppBar></AppBar>
     
      <Switch>
          <Route path='/igomoku'>
            <Dashboard></Dashboard>
          </Route>
          <Route path='/faq'>
            <FAQ></FAQ>
          </Route>
          <Route path='/auth/signin'>
            <LoginPage></LoginPage>
          </Route>
          <Route path='/auth/signup'>
            <SignupPage></SignupPage>
          </Route>
          <Route path='/'>
            <Redirect to="/igomoku"></Redirect>
          </Route>
          
      </Switch>
      </ToastProvider>
    </HashRouter>
  );
}


export default App;
