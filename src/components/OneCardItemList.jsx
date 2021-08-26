import React from 'react';

const OneCardItemList = (props) => {
    return (
        <div className="cardDiv" key={props.key}>
        <img src={props.card.images.small} alt="" height="400px" width="350px"/>
        <h2>{props.card.name}</h2>
        <div>
        {props.children}
        </div>
        </div>
    )
}

export default OneCardItemList
