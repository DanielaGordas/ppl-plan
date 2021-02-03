import React from 'react';
import classes from '../../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import background from "../../images/low-carbon/Game_1_screen_1.svg";
import badge from "../../images/low-carbon/Game_1_Bagde.svg";
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";

const SustainableFoodResult = () => {
  const text = JSON.parse(window.localStorage.getItem('result2'));

    return (
      <>
        <div className="GameNav">
          <div className="NavLink">
            <BiArrowBack className="LeftIcon"/> 
            <Link to="/sustainable-food-system/game">Back</Link>
          </div>
          <div className="NavLink">
            <Link to="/circulareconomy/intro">Next Game</Link>
            <BiExit className="RightIcon"/>
          </div>
        </div>
        <div className={classes.Background} style={{backgroundImage: `linear-gradient(rgba(169, 219, 232, 1),rgba(255, 255, 255, 0.7)), url(${background})`}}>
            <div className={classes.ResultBubble}>
              You’ve earned the Food Lover badge!
            </div>
            <img src={badge} alt="transport trophy" className={classes.ResultImg}/>
            <p className={classes.Text}>{text}</p>
            <Link to="/circulareconomy/intro"> <button className="Btn-border">Continue</button></Link>
        </div>
      </>
    )
  }

  export default SustainableFoodResult;