import React from 'react';
import classes from '../../styles/pages/lowcarbon.module.scss';
import { Link } from 'react-router-dom';
import '../../styles/components/button.scss';
import {FaAward} from "react-icons/fa";

const LowCarbonResult = () => {
    return (
        <div className={classes.BoxWrapper}>
            <h3 className={classes.ResultTitle}>Congratulations!</h3>
            <p className={classes.ResultText}>You chose a future which focuses on improving accessibility, affordability and infrastructure, helping more people to own electric vehicles. Benefits include the creation of approximately 27,000 new jobs, savings of up to 75% on running costs, and reducing emissions down to zero! You’re on the road to success, here’s your Transport Trophy!</p>
            <p className={classes.ResultIcon}><FaAward /></p>
            <Link to="/circulareconomy"> <button className="Btn">Next Game</button></Link>
      </div>
    )
  }
  
  export default LowCarbonResult;