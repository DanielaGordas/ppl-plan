import React from 'react';
import classes from '../../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import background from "../../images/circular-economy/Game_4_First_Screen.svg";
import badge from "../../images/circular-economy/Game_4_Bagde.svg";
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";

const CircularEconomyResult = ({gradient}) => {

    // retrieves result from Local Storage
    const result = JSON.parse(window.localStorage.getItem('result4'));

    // sets the result text based on the result of the game
    let text = "";
    if(result === "individual ownership"){
      text = "You chose a future low waste circular society in which the responsibility for most issues falls on the individual citizens."
    } else if (result === "community ownership"){
      text = "You chose a future low waste circular society in which the responsibility for most issues falls on the community."
    } else if (result === "council ownership"){
      text = "You chose a future low waste circular society in which the responsibility for most issues falls on the council."
    } else {
      text = "You chose a future low waste circular society in which the responsibility for most issues is shared among the local people, the community, and the council."
    };

    return (
      <>
        <div className="GameNav">
          <div className="NavLink">
            <BiArrowBack className="LeftIcon"/> 
            <Link to="/circulareconomy/game">Back</Link>
          </div>
          <div className="NavLink">
            <Link to="/retrofithomes/intro">Next Game</Link>
            <BiExit className="RightIcon"/>
          </div>
        </div>
        <div className={classes.Background} style={{backgroundImage: `linear-gradient(${gradient}), url(${background})`}}>
            <div className={classes.ResultBubble}>
              Congratulations! You've earned the Circular Economy Badge!
            </div>
            <img src={badge} alt="circular economy trophy" className={classes.ResultImg}/>
            <p className={classes.Text}>{text}</p>
            <Link to="/retrofithomes/intro"> <button className="Btn-border">Continue</button></Link>
        </div>
      </>
    )
  }
  
  export default CircularEconomyResult;