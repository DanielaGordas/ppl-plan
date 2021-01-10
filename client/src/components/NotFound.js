import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss';

const NotFound = () => {
    return(
        <div style={{textAlign: 'center', background: 'linear-gradient(rgba(174, 220, 232, 1), rgba(235, 249, 253, 1))', height: '100vh', width: '100vw'}}>
            <div style={{ margin: '5rem',}}>
                <h1 style={{fontSize: '2.5rem', color: '#102773'}}>404: Not found</h1>
                <Link to="/"><button className="Btn">Back to home</button></Link>
            </div>
        </div>
    )
}

export default NotFound;