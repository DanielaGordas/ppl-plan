import React from 'react';
import classes from './styles/components/layout.module.scss';
import TopicsList from './components/TopicsList';


const App = (props) => {
      return (
            <div className={classes.Layout}>
                  <TopicsList />
            </div>
      )
}

export default App;
