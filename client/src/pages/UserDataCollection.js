import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss'
import classes from '../styles/pages/user.module.scss';
import megaphone from '../images/megaphone.jpg'; 

const UserDataCollection = ({ topics }) => {

    return(
        <div className={classes.UserPage}>
            <img src={megaphone} alt="megaphone" className={classes.UserPageImg}/>
            <h3>Add your voice and help make change happen.</h3>
            <p>We just need some basic information to help ensure we are collecting data in a robust way.</p>
            <h3>Name: ------------------------------------------</h3>
            <h3>Gender: ----------------------------------------</h3>
            <h3>Postcode: --------------------------------------</h3>
            <Link to={`/topics/1`}><button className="Btn">Submit</button></Link>
        </div>
    )
}

export default UserDataCollection;