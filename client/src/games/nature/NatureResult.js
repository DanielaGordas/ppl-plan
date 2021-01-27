import React from 'react';
import classes from '../../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import badge from "../../images/nature/Game_6_Bagde.svg";
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";

const NatureResult = ({gradient, background}) => {

    // retrieves result from Local Storage
    const text = JSON.parse(window.localStorage.getItem('result6'));

    return (
      <>
        <div className="GameNav">
          <div className="NavLink">
            <BiArrowBack className="LeftIcon"/> 
            <Link to="/nature/game">Back</Link>
          </div>
          <div className="NavLink">
            <Link to="/outro">Next Game</Link>
            <BiExit className="RightIcon"/>
          </div>
        </div>
        <div className={classes.Background} style={{backgroundImage: `linear-gradient(${gradient}), url(${background})`}}>
            <div className={classes.ResultBubble}>
              Congratulations! You've earned the Mossy Medallion!
            </div>
            <img src={badge} alt="circular economy trophy" className={classes.ResultImg}/>
            <p className={classes.Text}>{text}</p>
            <Link to="/outro"> <button className="Btn-border">Continue</button></Link>
        </div>
      </>
    )
  }
  
  export default NatureResult;