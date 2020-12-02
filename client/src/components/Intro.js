import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/components/intro.module.scss';
import '../styles/components/button.scss';

const Intro = ({text, link, game}) => {
  return (
    <>
    <div className={classes.GameNav}>
        <Link to={game}>Back</Link>
        <Link to='/user'>Exit Game</Link>
    </div>
    <div className={classes.SpeechBubble}>
      <p>{text}</p>
    </div>
    <Link to={link} style={{textAlign: 'center'}}><button className="Btn Btn-standard">Begin!</button></Link>
    </>
  )
}

export default Intro;