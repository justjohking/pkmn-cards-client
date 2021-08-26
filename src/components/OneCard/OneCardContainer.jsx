import React from 'react';
import CardInfo from './CardInfo';
import './OneCardContainer.css'
const OneCardContainer = (props) => {
    return (
        <div className="container">
            <div>
            <img src={props.pokemon.images.large} alt="card"/>
            </div>
            
            <CardInfo pokemon={props.pokemon}/>
        </div>
    )
}

export default OneCardContainer


