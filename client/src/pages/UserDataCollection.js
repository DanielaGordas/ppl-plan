import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDataCollection = () => {

    useEffect(() => {
        axios.get(`/api/topics/1.json`)
            .then(res => setTopic(res.data))
    }, []);
        
    // define state
    const [topic, setTopic] = useState({});

    console.log(topic);

    return(
        <div>
            <h1>Give us your data!</h1>
            <Link to={`/topics/${topic.id}`}><button>Submit</button></Link>
        </div>
    )
}

export default UserDataCollection;