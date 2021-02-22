import React from 'react';
import classes from '../../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";
import BadgeBox from '../../components/BadgeBox';

const ResearchDevelopmentResult = ({gradient, background}) => {

    // retrieves result from Local Storage
    const text = JSON.parse(window.localStorage.getItem('result8'));

    return (
      <>
        <div className="GameNav">
          <div className="NavLink">
            <BiArrowBack className="LeftIcon"/> 
            <Link to="/research-development/game">Back</Link>
          </div>
          <div className="NavLink">
            <Link to="/circular-economy/intro">Next Game</Link>
            <BiExit className="RightIcon"/>
          </div>
        </div>
        <div className={classes.Background} style={{backgroundImage: `linear-gradient(${gradient}), url(${background})`}}>
            <div className={classes.Text}>
              {text ? <h3>You've earned the <strong>LAB BADGE</strong>!</h3> : null}
              <p>{text}</p>
            </div>
            < BadgeBox />
            <Link to="/circular-economy/intro"> <button className="Btn-border">Continue</button></Link>
        </div>
      </>
    )
  }
  
  export default ResearchDevelopmentResult;