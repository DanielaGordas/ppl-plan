import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserDataCollection = ({ topics }) => {

    return(
        <div>
            <h1>Give us your data!</h1>
            <Link to={`/topics/1`}><button>Submit</button></Link>
        </div>
    )
}

export default UserDataCollection;