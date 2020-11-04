// component that contains the list of topics from the API
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topic from './Topic';

const TopicsList = props => {
    
    // fetch all the topics from the API
    useEffect(() => {
        axios.get('/api/topics.json')
            .then(res => setTopics(res.data))
          }, []);
    
    // define state
    const [topics, setTopics] = useState([]);
    console.log(topics);

    return (
        <div>
          <div className="topics-list">
            {topics.map(topic => (
              < Topic topic={topic} key={topic.id}/>
            ))}
          </div>
        </div>
    )
}

export default TopicsList;