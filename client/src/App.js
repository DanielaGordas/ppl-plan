import React from 'react';
import classes from './App.scss';
import HomePage from './pages/HomePage';
import UserDataCollection from './pages/UserDataCollection';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LowCarbonGame from './games/low-carbon-travel/LowCarbonGame';


const App = () => {

      return (
            <Router>
                  <div className={classes.Layout}>
                        <Switch>
                              <Route path="/" exact component={HomePage} />
                              <Route path="/user" component={UserDataCollection}/>
                              <Route path="/game/lowcarbon">
                                    <LowCarbonGame />
                              </Route>
                        </Switch>     
                  </div>
            </Router>
      )
}

export default App;
