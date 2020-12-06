import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect } from 'react-redux';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/'>
          <h1>Home page</h1>
        </Route>
      </Switch>
    </BrowserRouter>
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
