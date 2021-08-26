import React from 'react';
import OneCardItemList from '../OneCardItemList';
import ExchangeOfferBox from './ExchangeOfferBox';
import apiHandler from '../../api/apiHandler';

class UserCardExchangeItem extends React.Component {

    handleAccept = () => {
        this.props.handleAccept();
    }

    handleDecline = () => {
        this.props.handleDecline()
    }

    render () {
        console.log(this.props.exchange)
        return (
            <div key={this.props.exchange.sellerItem._id +1}>
                <OneCardItemList 
                card={this.props.exchange.pokemonTCGId}
                />
                <div>
                    <p>Initial price of my card : {this.props.exchange.pokemonTCGId.cardmarket.prices.averageSellPrice}</p>
                </div>
                <ExchangeOfferBox items={this.props.exchange.buyerItem}/>
                <div>
                    <button onClick={this.handleAccept}>Accept Offer</button>
                    <button onClick={this.handleDecline}>Decline Offer</button>
                </div>
            </div>
        )
    }
}

export default UserCardExchangeItem
