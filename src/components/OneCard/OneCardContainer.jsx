import React from 'react';
import CardInfo from './CardInfo';
const OneCardContainer = (props) => {
    return (
        <div className="container">
            <div>
            <img src={props.pokemon.images.large} alt="card"/>
            </div>
            
            <CardInfo pokemon={props.pokemon} className="card-info-div"/>
        </div>
    )
}

export default OneCardContainer


