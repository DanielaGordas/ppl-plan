import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss'
import classes from '../styles/pages/home.module.scss';
import NavBar from '../components/NavBar';
<<<<<<< HEAD
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomePage = () => {
return(
<>
  <NavBar />
  <div className={classes.Background}>
    <h3 className={classes.Title}>Help us save the planet!</h3>
    <p className={classes.SubTitle}>Call to action here!</p>
  <div className={classes.HomeLogo}></div>
    <Link to="/user"><button className="Btn">Participate</button></Link>
  </div>
</>
=======
import {GoGlobe} from "react-icons/go";

const HomePage = () => {
    return(
        <>
            <NavBar />
            <div className={classes.Background}> 
                <h1 className={classes.Title}>The green revolution starts with you!</h1>
                <p className={classes.SubTitle}>Win 8 unique badges by re-imagining our future.</p>
                <p className={classes.SubTitle}>You will unlock exclusive tools to help you live more sustainably.</p>
                <GoGlobe className={classes.HomeLogo}/>
                <Link to="/user"><button className="Btn">Participate</button></Link>
            </div>
        </>
>>>>>>> 8a037ff11f189a326b3f18b1dc01b4d3bae68d19
    )
}

export default HomePage;