import React from 'react';
import "./OneCardItemList.css"

const OneCardItemList = (props) => {
    return (
        <div className="card-container" key={props.key}>
            <img src={props.card.images.small} alt="pokemon trading game card" />
            <p className='title'>{props.card.name}</p>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default OneCardItemList
