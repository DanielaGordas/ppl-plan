import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss'
import classes from '../styles/pages/home.module.scss';
import logo from '../images/logo-tagline.jpg';
import windmill from '../images/windmill.jpg';  
import NavBar from '../components/NavBar';

const HomePage = () => {
    return(
        <div className={classes.Home}>
            <NavBar />
            <img className={classes.HomeLogo} src={logo} alt="logo"/>
            <img className={classes.HomeImg} src={windmill} alt="windmill"/>
            <Link to="/user"><button className="Btn">Participate</button></Link>
        </div>
    )
}

export default HomePage;