import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/components/intro-result.module.scss';
import '../styles/components/button.scss';
import '../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";

const Intro = ({text, link, back, background, guy}) => {
  return (
    <>
      <div className="GameNav">
        <div className="NavLink">
          <BiArrowBack className="LeftIcon"/> 
          <Link to={back}>Back</Link>
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
        <div className={classes.Flex}>
          <img src={guy} alt="Character" className={classes.Character} />
          <Link to={link} style={{position: 'absolute', top: '80%', left:'45%', zIndex: '3'}}><button className="Btn-border">Begin!</button></Link>
        </div>
      </div>
    </>
  )
}

export default Intro;