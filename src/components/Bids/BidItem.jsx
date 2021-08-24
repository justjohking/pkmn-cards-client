import React from 'react';
import {Link} from 'react-router-dom';

const OneCardItemList = (props) => {
    return (
        <div className="cardDiv" key={props.card.id}>
        <img src={props.card.images.small} alt="" height="400px" width="350px"/>
        <p>Initial price: {props.card.cardmarket.prices.averageSellPrice}</p>
        <div>{props.card.name}</div>
        <Link to={"/cards/" + props.card.id}>Details</Link>
        </div>
    )
}

export default OneCardItemList
