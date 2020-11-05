import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss'
import classes from '../styles/pages/home.module.scss';
import logo from '../images/logo-tagline.jpg';
import windmill from '../images/windmill.jpg';  

const HomePage = () => {
    return(
        <div className={classes.Home}>
            <img className={classes.HomeImg} src={logo} alt="logo"/>
            <img className={classes.HomeImg} src={windmill} alt="windmill"/>
            <Link to="/user"><button>Start</button></Link>
        </div>
    )
}

export default HomePage;