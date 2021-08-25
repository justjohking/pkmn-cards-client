import React from 'react';
import { Link } from 'react-router-dom';

const OneCardItemList = (props) => {
    return (
        <div className="cardDiv" key={props.card.id}>
        <img src={props.card.images.small} alt="" height="400px" width="350px"/>
        <div>{props.card.name}</div>
        <Link to={props.link}>Card Info</Link>
        {props.children}
        </div>
    )
}

export default OneCardItemList
