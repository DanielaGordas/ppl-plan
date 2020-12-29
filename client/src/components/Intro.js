import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/components/intro-result.module.scss';
import '../styles/components/button.scss';
import '../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";

const Intro = ({text, link, game, background}) => {
  return (
    <>
      <div className="GameNav">
        <div className="NavLink">
          <BiArrowBack className="LeftIcon"/> 
          <Link to={game}>Back</Link>
        </div>
        <div className="NavLink">
          <Link to='/user'>Skip Game</Link>
          <BiExit className="RightIcon"/>
        </div>
      </div>
      <div className={classes.Background} style={{backgroundImage: `linear-gradient(rgba(169, 219, 232, 1),rgba(255, 255, 255, 0.6)), url(${background})`}}>
        <div className={classes.SpeechBubble}>
          <p>{text}</p>
        </div>
        <Link to={link} style={{textAlign: 'center', marginTop: '7rem'}}><button className="Btn-border">Begin!</button></Link>
      </div>
    </>
  )
}

export default Intro;