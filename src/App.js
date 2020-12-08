import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import "./App.css"
import AppBar from './components/AppBar/AppBar';
import HomePage from "./components/HomePage/HomePage";
import FAQ from "./components/FAQ/FAQ";
import Dashboard from './components/Dashboard/Dashboard';

import LoginPage from './containers/Signin';
import SignupPage from './containers/Signup';
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    
    <HashRouter>
      <AppBar></AppBar>
     
      <Switch>
        <ToastProvider>

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
            <HomePage></HomePage>
          </Route>
          
        </ToastProvider>
      </Switch>
    </HashRouter>
  );
}


export default App;
