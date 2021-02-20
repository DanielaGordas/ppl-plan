import React from 'react';
import classes from '../../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import '../../styles/components/button.scss';
import '../../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";
import background from '../../images/retrofit-homes/Game_3_new_screen.svg';
import BadgeBox from '../../components/BadgeBox';


const RetrofitHomesResult = ({gradient}) => {
  
    // retrieves result from Local Storage
    const text  = JSON.parse(window.localStorage.getItem('result3'));
    
    return (
      <>
        <div className="GameNav">
          <div className="NavLink">
            <BiArrowBack className="LeftIcon"/> 
            <Link to="/retrofit-homes/game">Back</Link>
          </div>
          <div className="NavLink">
            <Link to="/sustainable-food-system/intro">Next Game</Link>
            <BiExit className="RightIcon"/>
          </div>
        </div>
        <div className={classes.Background} style={{backgroundImage: `linear-gradient(${gradient}), url(${background})`}}>
            <div className={classes.Text}>
              {text ? <h3>You've earned the <strong>NET ZERO HOME BADGE</strong>!</h3> : null}
              <p>{text}</p>
            </div>
            < BadgeBox />
            <Link to="/sustainable-food-system/intro"> <button className="Btn-border" >Continue</button></Link>
        </div>
      </>
    )
  }
  
  export default RetrofitHomesResult;