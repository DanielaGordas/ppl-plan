import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss'
import classes from '../styles/pages/home.module.scss';
import NavBar from '../components/NavBar';

import Megafone from '../images/megaphone.svg'
import BadgeCarbonGrey from '../images/badges/Game_1_Badge_Grey.svg';
import BadgeFoodGrey from '../images/badges/Game_2_Badge_Grey.svg';
import BadgeRetroGrey from '../images/badges/Game_3_Badge_Grey.svg';
import BadgeCircularGrey from '../images/badges/Game_4_Badge_Grey.svg';
import BadgeNatureGrey from '../images/badges/Game_6_Badge_Grey.svg';
import BadgeEnergyGrey from '../images/badges/Game_7_Badge_Grey.svg';
import BadgeResearchGrey from '../images/badges/Game_8_Badge_Grey.svg';

const HomePage = () => {
    return(
        <div className={classes.Background}> 
        <NavBar />
            <img src={Megafone} alt="People's Plan Logo" className={classes.HomeLogo}/>
            <h1 className={classes.Title}>The green revolution starts with you!</h1>
            <p className={classes.SubTitle}>Earn 7 unique badges</p>
            <div className={classes.BadgeWrapper}>
                <img src={BadgeCarbonGrey} alt="Badge Low Carbon Travel" className={classes.Badge}/>
                <img src={BadgeFoodGrey} alt="Badge Sustainable Food System" className={classes.Badge}/>
                <img src={BadgeRetroGrey} alt="Badge Retrofit Homes" className={classes.Badge}/>
                <img src={BadgeCircularGrey} alt="Badge Circular Economy" className={classes.Badge}/>
                <img src={BadgeNatureGrey} alt="Badge Nature" className={classes.Badge}/>
                <img src={BadgeEnergyGrey} alt="Badge Clean Energy" className={classes.Badge}/>
                <img src={BadgeResearchGrey} alt="Badge Research" className={classes.Badge}/>
            </div>
            <p className={classes.SubTitle}>Re-imagine the future and unlock a toolkit to help you live more sustainably</p>
            <Link to="/user"><button className="Btn">Let's Go</button></Link>
        </div>
    )
}

export default HomePage;