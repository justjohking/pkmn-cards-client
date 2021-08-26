import React from 'react';
import {Link} from 'react-router-dom';
import OneCardItemList from '../../OneCardItemList';

const AuctionItem = (props) => {
    
    return (
        <div className="cardDiv" key={props.card._id}>
            <OneCardItemList card={props.card.pokemonTCGId} link={"/profile/cards/" + props.card._id}/>
                <div>
            <h2><b>Average price: {props.card.pokemonTCGId.cardmarket.prices.averageSellPrice}</b></h2>
            <Link to={"/cards/" + props.card.pokemonTCGId.id} className="template-button-all-cards">Auction Details</Link>
            </div>
        </div>
    )
}

export default AuctionItem
