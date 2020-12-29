import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import badges from '../images/badge_grid.svg';
import classes from '../styles/pages/intro.module.scss';

const IntroPage = () => {
    return(
        <>
            <NavBar />
            <div className={classes.Container} > 
                <div className={classes.Content}>
                    <h1>The green revolution starts with you!</h1>
                    <p>Win 8 unique badges by re-imagining our future.</p>
                    <p>You will unlock exclusive tools to help you live more sustainably.</p>
                    <img src={badges} alt="badges" className={classes.Badges} />
                    <Link to="/lowcarbon/intro"><button className="Btn">Let's go!</button></Link>
                </div>
            </div>
        </>
    )
}

export default IntroPage;