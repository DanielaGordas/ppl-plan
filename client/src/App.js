import React from 'react';
import classes from './styles/components/layout.module.scss';
import TopicsList from './components/TopicsList';
import Topic from './components/Topic';
import Box from './components/Box';
import HomePage from './pages/HomePage';
import UserDataCollection from './pages/UserDataCollection';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = (props) => {
      return (
            <Router>
            <div className={classes.Layout}>
                  <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/topics" exact component={TopicsList} />
                        <Route path="/user" component={UserDataCollection}/>
                        <Route path="/topics/:id" component={Topic} />
                        <Route path="/game" component={Box} />
                  </Switch>     
            </div>
            </Router>
      )
}

export default App;
