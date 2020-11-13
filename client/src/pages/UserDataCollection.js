import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss';
import NewUserForm from '../components/NewUserForm';
import classes from '../styles/pages/user.module.scss';
import megaphone from '../images/megaphone.jpg'; 
import axios from 'axios';

const UserDataCollection = ()=> {

    const initialFormState = {
        age:'',
        gender:'',
        postal_code:''
    };

    // function that sends a post request to the API with the guest user details from the form
    // this will trigger the create method in the guests_controller.rb 
    const addUser = guest => {
        
        const qs = require('qs');
      
        // post request that creates an instance of guest user
        axios.post('/api/guests', qs.stringify(
            {
              guest:{
                age: guest.age,
                gender: guest.gender,
                postal_code: guest.postal_code}
            }))
            .then(res => setGuest(res.data))
            .catch(error => console.log(error))
    };

    //retrieves the guest object from local storage
    const guestDetails = JSON.parse(window.localStorage.getItem('guest'));

    const [guest, setGuest] = useState(guestDetails || {})

    // stores the guest object in local storage
    useEffect(() => {
        window.localStorage.setItem('guest', JSON.stringify(guest));
    }, [guest])
    
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
            <Link to="/game/lowcarbon"><button className="Btn">Start</button></Link>
        </div>
    )
}

export default UserDataCollection;