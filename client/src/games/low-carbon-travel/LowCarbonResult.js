import React from 'react';
import classes from '../../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import background from "../../images/low-carbon/Game_1_screen_1.svg";
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";
import BadgeBox from '../../components/BadgeBox';

const LowCarbonResult = ({gradient}) => {
    // retrieves result from Local Storage
    const result = JSON.parse(window.localStorage.getItem('result1'));

    // sets the result text based on the result of the game
    let text = "";
    if(result === "Mass Transit Future"){
      text = "You chose a future which is focused on an efficient, affordable, and clean public transport system. With an electrified rail and bus network, and vastly improved cycling infrastructure, we can generate more than 230,000 jobs and significantly improve public health whilst reducing transport emissions."
    } else {
      text = "You chose a future which focuses on improving accessibility, affordability and infrastructure, helping more people to own electric vehicles. Benefits include the creation of approximately 27,000 new jobs, savings of up to 75% on running costs, and reducing emissions down to zero!"
    };

    return (
      <>
        <div className="GameNav">
          <div className="NavLink">
            <BiArrowBack className="LeftIcon"/> 
            <Link to="/low-carbon/game">Back</Link>
          </div>
          <div className="NavLink">
            <Link to="/circular-economy/intro">Next Game</Link>
            <BiExit className="RightIcon"/>
          </div>
        </div>
        <div className={classes.Background} style={{backgroundImage: `linear-gradient(${gradient}), url(${background})`}}>
            <div className={classes.Text}>
              {result ? <h3>You've earned the <strong>TRANSPORT BADGE</strong>!</h3> : null}
              <p>{text}</p>
            </div>
            < BadgeBox />
            <Link to="/circular-economy/intro"> <button className="Btn-border">Continue</button></Link>
        </div>
      </>
    )
  }

  export default LowCarbonResult;