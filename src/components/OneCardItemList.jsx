import React from 'react';

const OneCardItemList = (props) => {
    return (
        <div className="cardDiv" key={props.key}>
        <img src={props.card.images.small} alt="" height="400px" width="350px"/>
        <div>{props.card.name}</div>
        {props.children}
        </div>
    )
}

export default OneCardItemList
