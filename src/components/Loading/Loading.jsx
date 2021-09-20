import React from 'react';
import "./Loading.css";
import pokeball from '../../assets/pokeball.png'

const Loading = () => {
    return (
        <div className="loading-div big">
            <img className="loading-img" src={pokeball} alt="" />
        </div>
    )
}

export default Loading
