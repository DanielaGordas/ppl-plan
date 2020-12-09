import React from 'react';
import classes from '../../styles/pages/lowcarbon.module.scss';
import { Link } from 'react-router-dom';
import '../../styles/components/button.scss';
import {FaAward} from "react-icons/fa";

const RetrofitHomesResult = () => {
    return (
        <div className={classes.BoxWrapper}>
            <h3 className={classes.ResultTitle}>Congratulations!</h3>
            <p className={classes.ResultText}>Nice! Housing is a huge part of where we can make a difference for the climate, the economy and your wallet. It’s a win win win! Thanks for taking part, you can collect your Net Zero Home Badge!</p>
            <p className={classes.ResultIcon}><FaAward /></p>
            <Link to="/"> <button className="Btn">Next Game</button></Link>
      </div>
    )
  }
  
  export default RetrofitHomesResult;