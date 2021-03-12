import React, {useState, useEffect} from 'react';
import './App.scss';
import HomePage from './pages/HomePage';
import NotFound from './components/NotFound';
import OutroPage from './pages/OutroPage';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/AboutPage';
import UserDataCollection from './pages/UserDataCollection';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LowCarbonTravelGame from './games/low-carbon-travel/LowCarbonTravelGame';
import CircularEconomyGame from './games/circular-economy/CircularEconomyGame';
import RetrofitHomesGame from './games/retrofit-homes/RetrofitHomesGame';
import NatureGame from './games/nature/NatureGame';
import SustainableFoodGame from './games/sustainable-food-system/SustainableFoodGame';
import CleanEnergyGame from './games/clean-energy/CleanEnergyGame';
import Loader from './components/Loader';
import Dashboard from "./data-dashboard/Dashboard";




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
                                    <Route path="/about" >
                                          <AboutPage />
                                    </Route>
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
                                    <Route path="/nature">
                                          <NatureGame />
                                    </Route>
                                    <Route path="/clean-energy">
                                          <CleanEnergyGame />
                                    </Route>
                                    <Route path="/sustainable-food-system">
                                          <SustainableFoodGame />
                                    </Route>
                                    <Route path="/outro" component={OutroPage}/>
                                    <Route path="/data-dashboard">
                                          <Dashboard />
                                    </Route>
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
