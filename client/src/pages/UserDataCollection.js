import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss'
import classes from '../styles/pages/user.module.scss';
import megaphone from '../images/megaphone.jpg'; 

const UserDataCollection = ({ topics }) => {

    return(
        <div className={classes.UserPage}>
            <img src={megaphone} alt="megaphone" className={classes.UserPageImg}/>
            <div className={classes.UserPageContent}>
                <h3>Add your voice and help make change happen.</h3>
                <p>We just need some basic information to help ensure we are collecting data in a robust way.</p>
                <h4>Name:</h4>
                <h4>Gender:</h4>
                <h4>Postcode:</h4>
            </div>
            <Link to={`/topics/1`}><button className="Btn">Submit</button></Link>
        </div>
    )
}

export default UserDataCollection;