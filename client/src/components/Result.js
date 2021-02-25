import React from 'react';
import classes from '../styles/components/intro-result.module.scss';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss';
import '../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";
import BadgeBox from './BadgeBox';


const Result = ({gradient, background, text, badge, back, next}) => {

    return (
      <>
        <div className="GameNav">
          <div className="NavLink">
            <BiArrowBack className="LeftIcon"/> 
            <Link to={back}>Back</Link>
          </div>
          <div className="NavLink">
            <Link to={next}>Next</Link>
            <BiExit className="RightIcon"/>
          </div>
        </div>
        <div className={classes.Background} style={{backgroundImage: `linear-gradient(${gradient}), url(${background})`}}>
            <div className={classes.Text}>
              {text ? <h3>{badge}</h3> : null}
              <p>{text}</p>
            </div>
            < BadgeBox />
            <Link to={next}> <button className="Btn-border">Continue</button></Link>
        </div>
      </>
    )
  }

  export default Result;