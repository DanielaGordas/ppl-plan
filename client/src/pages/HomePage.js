import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss'
import classes from '../styles/pages/home.module.scss';
import NavBar from '../components/NavBar';
import megaphone from '../images/megaphone.svg';

const HomePage = () => {
    return(
        <>
            <NavBar />
            <div className={classes.Background}> 
                <h1 className={classes.Title}>The green revolution starts with you!</h1>
                <img src={megaphone} alt="people's plan megaphone logo" className={classes.HomeLogo}/>
                <p className={classes.SubTitle}>Win 8 unique badges by re-imagining our future.</p>
                <p className={classes.SubTitle}>You will unlock exclusive tools to help you live more sustainably.</p>
                <Link to="/user"><button className="Btn">Participate</button></Link>
            </div>
        </>
    )
}

export default HomePage;