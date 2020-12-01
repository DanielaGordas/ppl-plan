import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss';

const NotFound = () => {
    return(
        <div style={{textAlign: 'center',}}>
            <h1>404: Not found</h1>
            <Link to="/"><button className="Btn">Back to home</button></Link>
        </div>
    )
}

export default NotFound;