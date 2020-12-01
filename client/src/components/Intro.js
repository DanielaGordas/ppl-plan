import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/components/intro.module.scss';
import '../styles/components/button.scss';

const Intro = ({text}) => {
  return (
    <>
    <div className={classes.SpeechBubble}>
      <p>{text}</p>
    </div>
    <Link to="/lowcarbon/game" style={{textAlign: 'center'}}><button className="Btn Btn-standard">Begin!</button></Link>
    </>
  )
}

export default Intro;