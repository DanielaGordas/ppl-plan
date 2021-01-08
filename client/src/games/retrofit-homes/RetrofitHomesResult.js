import React from 'react';
import classes from '../../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";
import background from '../../images/retrofit-homes/Game_3_Background_Screen.svg';
import badge from '../../images/retrofit-homes/Game_3_Bagde.svg';


const RetrofitHomesResult = () => {
    return (
      <>
        <div className="GameNav">
          <div className="NavLink">
            <BiArrowBack className="LeftIcon"/> 
            <Link to="/retrofithomes/game">Back</Link>
          </div>
          <div className="NavLink">
            <Link to="/outro">Next Game</Link>
            <BiExit className="RightIcon"/>
          </div>
        </div>
        <div className={classes.Background} style={{backgroundImage: `linear-gradient(rgba(156, 199, 66, 1),rgba(255, 255, 255, 1)), url(${background})`}}>
            <div className={classes.ResultBubble}>
              Congratulations! You've earned the Net Zero Home Badge!
            </div>
            <img src={badge} alt="retrofit trophy" className={classes.ResultImg}/>
            <p className={classes.Text}>Housing is a huge part of where we can make a difference for the climate, the economy and your wallet. It’s a win win win!</p>
            <Link to="/outro"> <button className="Btn-border">Continue</button></Link>
        </div>
      </>
    )
  }
  
  export default RetrofitHomesResult;