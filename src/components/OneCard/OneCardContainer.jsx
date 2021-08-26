import React from 'react';
import CardInfo from './CardInfo';

const OneCardContainer = (props) => {
    return (
        <div className="container">
            <img src={props.pokemon.images.large} alt="card"/>
            <CardInfo pokemon={props.pokemon}/>
        </div>
    )
}

export default OneCardContainer


