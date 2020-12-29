import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss'
import classes from '../styles/pages/home.module.scss';
import logo from '../images/logo-tagline.jpg'; 
import NavBar from '../components/NavBar';
import {GoGlobe} from "react-icons/go";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomePage = () => {
    return(
        <>
        <NavBar />
        <div className={classes.Background}>
            <h3 className={classes.Title}>Help us save the planet!</h3>
            <p className={classes.SubTitle}>Call to action here!</p>
            <GoGlobe className={classes.HomeLogo}/>
            <Link to="/user"><button className="Btn">Participate</button></Link>
        </div>
        </>
    )
}

export default HomePage;