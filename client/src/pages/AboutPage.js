import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss'
import classes from '../styles/pages/privacy-about.module.scss';
import NavBar from '../components/NavBar';

const AboutPage = () => {
    return(
        <>
            <NavBar />
            <div className={classes.Background}> 
                <div className={classes.AboutContent}>
                    <h1 className={classes.Title}>About us</h1>
                    <p >The People's Plan is a not-for-profit community interest company dedicated to putting people's voices at the heart of our national and global transition to a net zero economy.</p>
                    <p>We are a grassroots group of volunteers who were concerned at the seeming lack of engagement from our governments in how climate policy is developed. We believe that gamification and other novel ways of engaging people should and can be deployed to leverage the passion and intelligence of normal people to decide their futures. We are currently unfunded, but are seeking donations and applying for charitable grants.</p>

                    <Link to="/user"><button className="Btn">Go Back</button></Link>
                </div>
            </div>
        </>
    )
}

export default AboutPage;