import React from 'react';
import classes from '../../styles/pages/lowcarbon.module.scss';
import { Link } from 'react-router-dom';
import '../../styles/components/button.scss';
import {FaAward} from "react-icons/fa";

const CircularEconomyResult = () => {
    return (
        <div className={classes.BoxWrapper}>
            <h3 className={classes.ResultTitle}>Congratulations!</h3>
            <p className={classes.ResultText}>The choices you made will help reduce how much stuff is created and make society a more resourceful place to live. Based on your choices you’ve voted for a...
            100% Circular economy. You get the Circular Economy Ribbon!
            75%  Circular economy.
            50% Circular economy - 50% the same as today. 
            25% Circular economy with most things still the same as today. 
            0% circular economy. No change in lifestyle then!</p>
            <p className={classes.ResultIcon}><FaAward /></p>
            <Link to="/"> <button className="Btn">Next Game</button></Link>
      </div>
    )
  }
  
  export default CircularEconomyResult;