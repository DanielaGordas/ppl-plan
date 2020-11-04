import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss'
import classes from '../styles/pages/home.module.scss';
import logo from '../images/logo-tagline.jpg'; 

const HomePage = () => {
    return(
        <div className={classes.Home}>
            <img className={classes.HomeImg} src={logo} alt="logo"/>
            <Link to={'/user'}><button className="Btn">Let's Go</button></Link>
        </div>
    )
}

export default HomePage;