import React from 'react';
import classes from '../../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import background from "../../images/low-carbon/Game_1_Final_screen_background.svg";
import badge from "../../images/low-carbon/Game_1_Bagde.svg";
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";

const LowCarbonResult = () => {
    // retrieves result from Local Storage
    const result = JSON.parse(window.localStorage.getItem('result1'));

    // sets the result text based on the result of the game
    let text = "";
    if(result === "mass transit"){
      text = "You chose a future which focuses on an efficient, affordable, and clean public transport system. This will help generate more than 230,000 jobs and significantly improve public health whilst reducing transport emissions."
    } else {
      text = "You chose a future which focuses on improving accessibility, affordability and infrastructure for personal electric vehicles. This will help create approximately 27,000 new jobs, save up to 75% on running costs, and redue emissions down to zero!"
    };

    return (
      <>
        <div className="GameNav">
          <div className={classes.NavButton}>
            <BiArrowBack className={classes.MarginRight}/> 
            <Link to="/lowcarbon/game">Back</Link>
          </div>
          <div className={classes.NavButton}>
            <Link to="/circulareconomy">Next Game</Link>
            <BiExit className={classes.MarginLeft}/>
          </div>
        </div>
        <div className={classes.Background} style={{backgroundImage: `linear-gradient(rgba(169, 219, 232, 1),rgba(255, 255, 255, 0.6)), url(${background})`}}>
            <div className={classes.ResultBubble}>
              Congratulations! You've earned the Transport Badge!
            </div>
            <img src={badge} alt="transport trophy" className={classes.ResultImg}/>
            <p className={classes.Text}>{text}</p>
            <Link to="/circulareconomy"> <button className="Btn-border">Continue</button></Link>
        </div>
      </>
    )
  }

  export default LowCarbonResult;