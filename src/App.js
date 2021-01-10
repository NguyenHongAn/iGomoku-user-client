import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import {useDispatch} from 'react-redux';


import FAQ from "./components/FAQ/FAQ";
import Dashboard from './containers/Dashboard/Dashboard';
import LoginPage from './containers/Signin';
import SignupPage from './containers/Signup';
import DetailGamePage from './containers/DetailHistoryGame';
import NotFound from './containers/NotFound';
import BoardContainer from './containers/Board/BoardContainer';
import ProfilePage from './containers/Profile';
import { ToastProvider } from "react-toast-notifications";
import ReduxAction from './store/actions/';
import VerifyMailPage from './containers/OtherPages/VerifyMailPage';


function App() {
  const dispatch = useDispatch();

  dispatch(ReduxAction.socket.setupSocket());

  return (
    
    <BrowserRouter >
      <ToastProvider>
      <AppBar></AppBar>
     
      <Switch>
          <Route path='/faq'>
            <FAQ></FAQ>
          </Route>
          <Route path='/auth/signin'>
            <LoginPage></LoginPage>
          </Route>
          <Route path='/auth/signup'>
            <SignupPage></SignupPage>
          </Route>
          <Route path='/profile'>
            <ProfilePage></ProfilePage>
          </Route>
          <Route path='/board/:boardID'>
            <BoardContainer></BoardContainer>
          </Route>
          <Route path='/detail-game/:gameID'>
            <DetailGamePage></DetailGamePage>
          </Route>
          <Route path='/verify-email/:decodekey'>
            <VerifyMailPage></VerifyMailPage>
          </Route>

          <Route exact path='/igomoku'>
            <Dashboard></Dashboard>
          </Route>
          <Route path='/'>
            <Redirect to="/igomoku"></Redirect>
          </Route>
          <Route>
            <NotFound></NotFound>
          </Route>
      </Switch>
      </ToastProvider>
    </BrowserRouter>
  );
}


export default App;
