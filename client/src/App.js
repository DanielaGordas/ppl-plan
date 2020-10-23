import React from 'react';
import classes from './styles/components/layout.module.scss';
import InfographicsCarousel from './components/InfographicsCarousel';


const App = (props) => {
return (
<div className={classes.Layout}>
      <InfographicsCarousel />
</div>
)
  
}

export default App;
