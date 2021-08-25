import React from 'react';
import OneCardItemList from '../CardsList/OneCardItemList'

const UserCardExchangeItem = (props) => {
    console.log(props)
    return (
        <div key={props.exchange.sellerItem._id}>
            <OneCardItemList 
            card={props.exchange.pokemonTCGId}
            key={props.exchange.sellerItem._id + 1}
            />
            
        </div>
    )
}

export default UserCardExchangeItem
