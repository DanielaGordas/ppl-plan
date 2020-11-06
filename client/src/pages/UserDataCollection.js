import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss';
import NewUserForm from '../components/NewUserForm';
import classes from '../styles/pages/user.module.scss';
import megaphone from '../images/megaphone.jpg'; 
import axios from 'axios';

const UserDataCollection = ({ topics }) => {

    const initialFormState = {
        age:'',
        gender:'',
        postal_code:''
    };

    const addUser = guest => {
        
        const qs = require('qs');
      
        axios.post('/api/guests', qs.stringify(
            {
              guest:{
                age: guest.age,
                gender: guest.gender,
                postal_code: guest.postal_code}
            }))
            .then(res=>( console.log(res)))
            .catch( error => console.log(error))
    };


    return(
        <div className={classes.UserPage}>
            <img src={megaphone} alt="megaphone" className={classes.UserPageImg}/>
            <div className={classes.UserPageContent}>
                <h3>Add your voice and help make change happen.</h3>
                <p>We just need some basic information to help ensure we are collecting data in a robust way.</p>
                <div>
                <NewUserForm addUser={addUser} initialFormState={initialFormState}/>
                </div>
            </div>
            <Link to={`/topics/1`}><button className="Btn">Start</button></Link>
        </div>
    )
}

export default UserDataCollection;