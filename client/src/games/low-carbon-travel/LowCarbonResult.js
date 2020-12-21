import React from 'react';
import classes from '../../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import background from "../../images/low-carbon/Game_1_Final_screen_background.svg";
import badge from "../../images/low-carbon/Game_1_Bagde.svg";
import character from "../../images/low-carbon/Character_1_Final_screen.svg";

const LowCarbonResult = () => {
    // retrieves result from Local Storage
    const result = JSON.parse(window.localStorage.getItem('result1'));

    // sets the result text based on the result of the game
    let text = "";
    if(result === "mass transit"){
      text = "You've earned the Transport Trophy by chosing a future which is focused on an efficient, affordable, and clean public transport system. This will help generate more than 230,000 jobs and significantly improve public health whilst reducing transport emissions."
    } else {
      text = "You've earned the Transport Trophy by chosing a future which focuses on improving accessibility, affordability and infrastructure for personal electric vehicles. This will help create approximately 27,000 new jobs, save up to 75% on running costs, and redue emissions down to zero!"
    };

    return (
      <>
        <div className={classes.GameNav}>
          <Link to="/lowcarbon/game">Back</Link>
          <Link to="/circulareconomy">Next Game</Link>
        </div>
        <div className={classes.Background} style={{backgroundImage: `url(${background})`}}>
            <img src={badge} alt="transport trophy" className={classes.ResultImg}/>
            <div className={classes.ResultContent}>
              <img src={character} alt="character 1" className={classes.ResultCharacter}/>
              <div className={classes.ResultBubble}>
                {text}
              </div>
            </div>
            <Link to="/circulareconomy"> <button className={classes.Btn}>Next Game</button></Link>
        </div>
      </>
    )
  }

  export default LowCarbonResult;