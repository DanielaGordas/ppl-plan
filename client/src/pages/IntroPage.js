import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import badges from '../images/Locked_Badges_Screen.svg';
import classes from '../styles/pages/intro.module.scss';

const IntroPage = () => {
    return(
        <div className={classes.Container} >
            <NavBar />
            <div className={classes.Content}>
                <h1>The green revolution starts with you!Win 8 unique badges by re-imagining our future.You will unlock exclusive tools to help you live more sustainably.</h1>
                <img src={badges} alt="badges"/>
                <Link to="/lowcarbon/intro"><button className="Btn">Let's go!</button></Link>
            </div>
            
        </div>
    )
}

export default IntroPage;