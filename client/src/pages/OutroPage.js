import React from 'react';
import NavBar from '../components/NavBar';
import classes from '../styles/pages/outro.module.scss';
import {GoGlobe} from 'react-icons/go';

const OutroPage = () => {
    return(
      <>
        <NavBar />
        <div className={classes.Container} >
            <div className={classes.Content}>
                <h1>Thank you for playing through the 8 scenarios!</h1>
                <p>Follow THIS LINK to explore some extra resources.</p>
                <p>We appreciate your feedback. Which improvements to our website would you like to see?</p>
                <p>LINK TO FEEDBACK FORM</p>
            </div>
            <GoGlobe className={classes.Globe} />
        </div>
      </>
    )
}

export default OutroPage;