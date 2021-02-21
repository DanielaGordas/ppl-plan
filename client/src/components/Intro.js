import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/components/intro-result.module.scss';
import '../styles/components/button.scss';
import '../styles/components/nav.scss';
import { BiArrowBack, BiExit } from "react-icons/bi";

const Intro = ({text, link, back, skip, background, character, gradient, characterPosition}) => {
  return (
    <>
      <div className="GameNav">
        <div className="NavLink">
          <BiArrowBack className="LeftIcon"/> 
          <Link to={back}>Back</Link>
        </div>
        <div className="NavLink">
          <Link to={skip}>Skip Game</Link>
          <BiExit className="RightIcon"/>
        </div>
      </div>
      <div className={classes.Background} style={{backgroundImage: `linear-gradient(${gradient}), url(${background})`}}>
        <div className={classes.SpeechBubble}>
          <p>{text}</p>
        </div>
        <div className={classes.Flex}>
          <img src={character} alt="Character" className={classes[characterPosition]} />
          <Link to={link} style={{position: 'absolute', top: '90%', left:'45%', zIndex: '3'}}><button className="Btn-border">Begin!</button></Link>
        </div>
      </div>
    </>
  )
}

export default Intro;