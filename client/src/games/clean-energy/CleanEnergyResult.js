import React from 'react';
import classes from '../../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import badge from "../../images/clean-energy/Game_7_Bagde.svg";
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";

const CleanEnergyResult = ({gradient, background}) => {

    // retrieves result from Local Storage
    const text = JSON.parse(window.localStorage.getItem('result7'));

    return (
      <>
        <div className="GameNav">
          <div className="NavLink">
            <BiArrowBack className="LeftIcon"/>
            <Link to="/clean-energy/game">Back</Link>
          </div>
          <div className="NavLink">
            <Link to="/outro">Next Game</Link>
            <BiExit className="RightIcon"/>
          </div>
        </div>
        <div className={classes.Background} style={{backgroundImage: `linear-gradient(${gradient}), url(${background})`}}>
            <p className={classes.Text}>{text}</p>
            <Link to="/outro"> <button className="Btn-border">Continue</button></Link>
        </div>
      </>
    )
  }
  
  export default CleanEnergyResult;