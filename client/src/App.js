import React from 'react';
import './App.scss';
import HomePage from './pages/HomePage';
import NotFound from './components/NotFound';
import UserDataCollection from './pages/UserDataCollection';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LowCarbonGame from './games/low-carbon-travel/LowCarbonGame';
import CircularEconomyGame from './games/circular-economy/CircularEconomyGame';
import RetrofitHomesGame from './games/retrofit-homes/RetrofitHomesGame';


const App = () => {

      return (
            <Router>
                  <div className="Layout">
                        <Switch>
                              <Route path="/" exact component={HomePage} />
                              <Route path="/about" ></Route>
                              <Route path="/privacy" ></Route>
                              <Route path="/user" component={UserDataCollection}/>
                              <Route path="/lowcarbon">
                                    <LowCarbonGame />
                              </Route>
                              <Route path="/circulareconomy">
                                    <CircularEconomyGame />
                              </Route>
                              <Route path="/retrofithomes">
                                    <RetrofitHomesGame />
                              </Route>
                              <Route>
                                    <NotFound />
                              </Route>
                        </Switch>     
                  </div>
            </Router>
      )
}

export default App;
