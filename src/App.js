import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import "./App.css"
import AppBar from './components/AppBar/AppBar';
import HomePage from "./components/HomePage/HomePage";
import FAQ from "./components/FAQ/FAQ";
import Dashboard from './components/Dashboard/Dashboard';



function App() {
  return (
    
    <HashRouter>
      <AppBar></AppBar>
     
      <Switch>

      <Route path='/igomoku'>
      <Dashboard></Dashboard>
      </Route>
      <Route path='/faq'>
         <FAQ></FAQ>
        </Route>
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


export default App;
