import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import {connect } from 'react-redux';
import "./App.css"
import AppBar from './components/AppBar/AppBar';
import HomePage from "./components/HomePage/HomePage";
import FAQ from "./components/FAQ/FAQ";





function App() {
  return (
    
    <HashRouter>
      <AppBar></AppBar>
     
      <Switch>

        <Route path='/faq'>
         <FAQ></FAQ>
        </Route>
        <Route path='/'>
         <HomePage></HomePage>
        </Route>
      </Switch>
    </HashRouter>
  );
}

const mapState = (state) =>({
  ...state.socketReducer
});

const mapDispatch = {
  log: console.log("dispatch")
};

export default connect(
  mapState,
  mapDispatch
)(App);
