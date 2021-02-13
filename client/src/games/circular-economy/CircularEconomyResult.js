import React from 'react';
import classes from '../../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import background from "../../images/circular-economy/Game_4_First_Screen.svg";
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";
import BadgeBox from '../../components/BadgeBox';

const CircularEconomyResult = ({gradient}) => {

    // retrieves result from Local Storage
    const result = JSON.parse(window.localStorage.getItem('result4'));

    // sets the result text based on the result of the game
    let text = "";
    if(result === "now"){
      text = "Wow! You’re really progressive.We’re happy to award you with the Sharing Economy Badge"
    } else if (result === "future"){
      text = "Great choices, you’ve selected a mix of acting now and making changes in the future. You’ve earned your Sharing Economy Badge"
    } else if (result === "never"){
      text = "It looks like you’re happy with the way things are. This might cause some waste issues…You need to make some more ambitious choices before we can award you the badge."
    } else {
      text = "Great choices, you’ve selected a mix of acting now and making changes in the future. You’ve earned your Sharing Economy Badge"
    };

    return (
      <>
        <div className="GameNav">
          <div className="NavLink">
            <BiArrowBack className="LeftIcon"/> 
            <Link to="/circular-economy/game">Back</Link>
          </div>
          <div className="NavLink">
            <Link to="/retrofit-homes/intro">Next Game</Link>
            <BiExit className="RightIcon"/>
          </div>
        </div>
        <div className={classes.Background} style={{backgroundImage: `linear-gradient(${gradient}), url(${background})`}}>
            <div className={classes.Text}>
              <h3>The sharing economy can help reduce waste!</h3>
              <p>{text}</p>
            </div>
            < BadgeBox />
            <Link to="/retrofit-homes/intro"> <button className="Btn-border">Continue</button></Link>
        </div>
      </>
    )
  }
  
  export default CircularEconomyResult;