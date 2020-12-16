import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/components/intro.module.scss';
import '../styles/components/button.scss';

const Intro = ({text, link, game, background}) => {
  return (
    <>
      <div className={classes.GameNav}>
          <Link to={game}>Back</Link>
          <Link to='/user'>Exit Game</Link>
      </div>
      <div className={classes.Background} style={{backgroundImage: `url(${background})`}}>
        <div className={classes.SpeechBubble}>
          <p>{text}</p>
        </div>
        <Link to={link} style={{textAlign: 'center', marginTop: '7rem'}}><button className={classes.Btn}>Begin!</button></Link>
      </div>
    </>
  )
}

export default Intro;