import React from 'react';
import classes from '../styles/components/badge-box.module.scss';

import BadgeCarbonColour from '../images/low-carbon/Game_1_Bagde.svg';
import BadgeCarbonGrey from '../images/low-carbon/Badge_Grey.svg';
import BadgeCircularColour from '../images/circular-economy/Game_4_Bagde.svg';
import BadgeNatureColour from '../images/nature/Game_6_Bagde.svg';




const BadgeBox = () => {
    return(
        <div className={classes.Wrapper}>
            <img src={BadgeCarbonColour} className={classes.Badge}/>
            <img src={BadgeCircularColour} className={classes.Badge}/>
            <img src={BadgeNatureColour} className={classes.Badge}/>
            <img src={BadgeCarbonGrey} className={classes.Badge}/>
            <img src={BadgeCarbonGrey} className={classes.Badge}/>
            <img src={BadgeCarbonGrey} className={classes.Badge}/>
            <img src={BadgeCarbonGrey} className={classes.Badge}/>
            <img src={BadgeCarbonGrey} className={classes.Badge}/>
        </div>
    )
}

export default BadgeBox;