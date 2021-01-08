import React, {useState, useEffect} from 'react';
import './App.scss';
import HomePage from './pages/HomePage';
import NotFound from './components/NotFound';
import OutroPage from './pages/OutroPage';
import PrivacyPage from './pages/PrivacyPage';
import UserDataCollection from './pages/UserDataCollection';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LowCarbonTravelGame from './games/low-carbon-travel/LowCarbonTravelGame';
import CircularEconomyGame from './games/circular-economy/CircularEconomyGame';
import RetrofitHomesGame from './games/retrofit-homes/RetrofitHomesGame';
import Loader from './components/Loader';


const App = () => {

      const [loading, setLoading] = useState(true)

      useEffect(() => {
            setTimeout(() => setLoading(false), 1000)
          }, [])

      return (
            <>
            {loading === false ? (
                  <Router>
                        <div className="Layout">
                              <Switch>
                                    <Route path="/" exact component={HomePage} />
                                    <Route path="/about" ></Route>
                                    <Route path="/privacy" >
                                          <PrivacyPage />
                                    </Route>
                                    <Route path="/user" component={UserDataCollection}/>
                                    <Route path="/lowcarbon">
                                          <LowCarbonTravelGame />
                                    </Route>
                                    <Route path="/circulareconomy">
                                          <CircularEconomyGame />
                                    </Route>
                                    <Route path="/retrofithomes">
                                          <RetrofitHomesGame />
                                    </Route>
                                    <Route path="/outro" component={OutroPage}/>
                                    <Route>
                                          <NotFound />
                                    </Route>
                              </Switch> 
                        </div>    
                  </Router>
            ) : (
                  <Loader />
            )}
            </>
      );
}

export default App;
