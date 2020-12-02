import React, { useState, useEffect } from 'react';
import '../styles/components/button.scss';
import NewUserForm from '../components/NewUserForm';
import NavBar from '../components/NavBar'
import classes from '../styles/pages/user.module.scss';
import icon from '../images/icon.png'; 
import axios from 'axios';

const UserDataCollection = ()=> {

    const initialFormState = {
        age:'',
        gender:'',
        postal_code:''
    };

    //retrieves the guest object from local storage
    const guestDetails = JSON.parse(window.localStorage.getItem('guest'));

    const [guest, setGuest] = useState(guestDetails || {})

    // stores the guest object in local storage

    useEffect(() => {
        window.localStorage.setItem('guest', JSON.stringify(guest));
    }, [guest])

    // function that sends a post request to the API with the guest user details from the form
    // this will trigger the create method in the guests_controller.rb 
    const addUser = async guest => {

        const qs = require('qs');

        const postalCode = guest.postal_code;

        const council = await axios.get(`https://api.postcodes.io/postcodes/${postalCode}`)
        .then(res => res.data.result.admin_district)
        .catch(err => console.log(err))
      
        // post request that creates an instance of guest user
        axios.post('/api/guests', qs.stringify(
            {
              guest:{
                age: guest.age,
                gender: guest.gender,
                postal_code: guest.postal_code,
                council: council
                }
            }))
            .then(res => {
                setGuest(res.data);
                handleRedirect(res);
            })
            .catch(error => console.log(error))
        
    };

    const handleRedirect  = (res) => {
        if(res.status === 201 || res.status === 200) {
            window.location = '/lowcarbon'
        } else {
            window.location = '/user'
        }
    }
    

    
    return(
        <div>
            <NavBar />
            <div className={classes.UserPage}>
                <img src={icon} alt="people's plan icon" className={classes.UserPageImg}/>
                <div className={classes.UserPageContent}>
                    <h3>Add your voice and help make change happen.</h3>
                    <p>We just need some basic information to help ensure we are collecting data in a robust way.</p>
                    <div>
                    <NewUserForm addUser={addUser} initialFormState={initialFormState}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDataCollection;