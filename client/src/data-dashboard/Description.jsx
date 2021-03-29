import React from 'react';

const Description = ({game}) => {

    const text = {
        "Retrofit Homes": "For Retrofit homes, we have assigned the users' first placed option 9 points and their ninth placed option 1 point.",
        "Clean Energy": "For Clean Energy, we have assigned one point to the bar chart for every token placed by the user in game."
    }
    
    return (
        <div style={{ fontSize: "20px", textAlign: "center" }}>
            <p>{text[game]}</p>
        </div>
    );
};

export default Description;