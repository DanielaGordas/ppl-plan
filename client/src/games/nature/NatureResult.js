import React from 'react';
import classes from '../../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";
import BadgeBox from '../../components/BadgeBox';

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
            <Link to="/clean-energy/intro">Next Game</Link>
            <BiExit className="RightIcon"/>
          </div>
        </div>
        <div className={classes.Background} style={{backgroundImage: `linear-gradient(${gradient}), url(${background})`}}>
            <div className={classes.Text}>
            {text ? <h3>You've earned the <strong> MOSSY BADGE</strong>!</h3> : null}
              <p>{text}</p>
            </div>
            < BadgeBox />
            <Link to="/clean-energy/intro"> <button className="Btn-border">Continue</button></Link>
        </div>
      </>
    )
  }
  
  export default NatureResult;