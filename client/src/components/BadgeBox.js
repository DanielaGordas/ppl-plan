import React from 'react';
import classes from '../styles/components/badge-box.module.scss';

// Images and icons

import BadgeCarbonColour from '../images/badges/Game_1_Badge_Colour.svg';
import BadgeCarbonGrey from '../images/badges/Game_1_Badge_Grey.svg';
import BadgeFoodColour from '../images/badges/Game_2_Badge_Colour.svg';
import BadgeFoodGrey from '../images/badges/Game_2_Badge_Grey.svg';
import BadgeRetroColour from '../images/badges/Game_3_Badge_Colour.svg';
import BadgeRetroGrey from '../images/badges/Game_3_Badge_Grey.svg';
import BadgeCircularColour from '../images/badges/Game_4_Badge_Colour.svg';
import BadgeCircularGrey from '../images/badges/Game_4_Badge_Grey.svg';
import BadgeNatureColour from '../images/badges/Game_6_Badge_Colour.svg';
import BadgeNatureGrey from '../images/badges/Game_6_Badge_Grey.svg';
import BadgeEnergyColour from '../images/badges/Game_7_Badge_Colour.svg';
import BadgeEnergyGrey from '../images/badges/Game_7_Badge_Grey.svg';
import BadgeResearchColour from '../images/badges/Game_8_Badge_Colour.svg';
import BadgeResearchGrey from '../images/badges/Game_8_Badge_Grey.svg';



const BadgeBox = () => {

    // retrieves results for each game from Local Storage
    const result1 = JSON.parse(window.localStorage.getItem('result1'));
    const result2 = JSON.parse(window.localStorage.getItem('result2'));
    const result3 = JSON.parse(window.localStorage.getItem('result3'));
    const result4 = JSON.parse(window.localStorage.getItem('result4'));
    const result6 = JSON.parse(window.localStorage.getItem('result6'));
    const result7 = JSON.parse(window.localStorage.getItem('result7'));
    const result8 = JSON.parse(window.localStorage.getItem('result8'));

    return(
        <div className={classes.Wrapper}>
            <img src={result1? BadgeCarbonColour : BadgeCarbonGrey} alt="BadgeCarbonColour" className={classes.Badge}/>
            <img src={result4 && result4 !== "never" ? BadgeCircularColour : BadgeCircularGrey} alt="BadgeCarbonColour" className={classes.Badge}/>
            <img src={result3? BadgeRetroColour : BadgeRetroGrey} alt="BadgeCarbonColour" className={classes.Badge}/>
            <img src={result6? BadgeNatureColour : BadgeNatureGrey} alt="BadgeCarbonColour" className={classes.Badge}/>
            <img src={result7? BadgeEnergyColour : BadgeEnergyGrey} alt="BadgeCarbonColour" className={classes.Badge}/>
            <img src={result8? BadgeResearchColour : BadgeResearchGrey} alt="BadgeCarbonColour" className={classes.Badge}/>
            <img src={result2? BadgeFoodColour : BadgeFoodGrey} alt="BadgeCarbonColour" className={classes.Badge}/>
        </div>
    )
}

export default BadgeBox;