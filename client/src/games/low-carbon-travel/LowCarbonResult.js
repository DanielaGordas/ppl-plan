import React from 'react';
import classes from '../../styles/components/intro.module.scss';
import { Link } from 'react-router-dom';
import background from "../../images/low-carbon/Game1_screen6.svg";

const LowCarbonResult = () => {
    // retrieves result from Local Storage
    const result = JSON.parse(window.localStorage.getItem('result1'));

    // sets the result text based on the result of the game
    let text = "";
    if(result === "mass transit"){
      text = "You chose a future which is focused on an efficient, affordable, and clean public transport system. With an electrified rail and bus network, and vastly improved cycling infrastructure, we can generate more than 230,000 jobs and significantly improve public health whilst reducing transport emissions. You’re on the road to success, here’s your Transport Trophy!"
    } else {
      text = "You chose a future which focuses on improving accessibility, affordability and infrastructure, helping more people to own electric vehicles. Benefits include the creation of approximately 27,000 new jobs, savings of up to 75% on running costs, and reducing emissions down to zero! You’re on the road to success, here’s your Transport Trophy!"
    };

    return (
      <>
        <div className={classes.GameNav}>
          <Link to="/lowcarbon/game">Back</Link>
          <Link to="/circulareconomy">Next Game</Link>
        </div>
        <div className={classes.Background} style={{backgroundImage: `url(${background})`}}>
            <div className={classes.ResultBubble}>
              <p>{text}</p>
            </div>
            <Link to="/circulareconomy" style={{textAlign: 'center', marginTop: '8rem'}}> <button className={classes.Btn}>Next Game</button></Link>
        </div>
      </>
    )
  }

  export default LowCarbonResult;