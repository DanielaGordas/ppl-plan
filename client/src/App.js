import React from 'react';
import classes from './App.scss';
import HomePage from './pages/HomePage';
import UserDataCollection from './pages/UserDataCollection';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LowCarbonGame from './games/low-carbon-travel/LowCarbonGame';

import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';


const App = () => {

      const hasNative =
      document && (document.elementsFromPoint || document.msElementsFromPoint)

      function getDropTargetElementsAtPoint(x, y, dropTargets) {
      return dropTargets.filter(t => {
      const rect = t.getBoundingClientRect()
      return (
      x >= rect.left &&
      x <= rect.right &&
      y <= rect.bottom &&
      y >= rect.top
      )
      })
      }

      // use custom function only if elementsFromPoint is not supported
      const backendOptions = {
      getDropTargetElementsAtPoint: !hasNative && getDropTargetElementsAtPoint, 
      }

      return (
            <Router>
                  <DndProvider backend={TouchBackend} options={backendOptions}>
                        <div className={classes.Layout}>
                              <Switch>
                                    <Route path="/" exact component={HomePage} />
                                    <Route path="/user" component={UserDataCollection}/>
                                    <Route path="/game/lowcarbon">
                                          <LowCarbonGame />
                                    </Route>
                              </Switch>     
                        </div>
                  </DndProvider>
            </Router>
      )
}

export default App;
