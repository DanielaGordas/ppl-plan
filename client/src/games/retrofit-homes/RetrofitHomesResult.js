import React from 'react';
import classes from '../../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";
import background from '../../images/retrofit-homes/Game_3_new_screen.svg';
import badge from '../../images/retrofit-homes/Game_3_Bagde.svg';


const RetrofitHomesResult = () => {
    // retrieves result from Local Storage
    const text  = JSON.parse(window.localStorage.getItem('result3'));
    
    return (
      <>
        <div className="GameNav">
          <div className="NavLink">
            <BiArrowBack className="LeftIcon"/> 
            <Link to="/retrofithomes/game">Back</Link>
          </div>
          <div className="NavLink">
            <Link to="/nature/intro">Next Game</Link>
            <BiExit className="RightIcon"/>
          </div>
        </div>
        <div className={classes.Background} style={{backgroundImage: `linear-gradient(rgba(19, 213, 255, .8),rgba(255, 255, 255, .7)), url(${background})`}}>
            <div className={classes.ResultBubble}>
              Congratulations! You've earned the Net Zero Home Badge!
            </div>
            <img src={badge} alt="retrofit trophy" className={classes.ResultImg}/>
            <p className={classes.Text}>{text}</p>
            <Link to="/nature/intro"> <button className="Btn-border" >Continue</button></Link>
        </div>
      </>
    )
  }
  
  export default RetrofitHomesResult;