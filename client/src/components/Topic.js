// component that contains each topic 
import React, { useState, useEffect } from 'react';
import classes from '../styles/components/topic.module.scss';
import InfographicsCarousel from './InfographicsCarousel';
import { Link } from 'react-router-dom';

// this will be dinamic data from the backend that we will have to fetch

const Topic = ( {match} ) => {

    // fetch all the topics from the API
    useEffect(() => {
        fetchTopic();

    }, []);
    
    // define state
    const [topic, setTopic] = useState({});

    const fetchTopic = async () => {
        const fetchTopic = await fetch(`/api/topics/${match.params.id}`)

        const topic = await fetchTopic.json();
        setTopic(topic);

    }

    return(
        <div className={classes.Topic} >
            <h4>{topic.title}</h4>
            <InfographicsCarousel />
            <h4>GAME</h4>
            <Link to="/game"><button>Go to Game</button></Link>
        </div>
    )
}

export default Topic;