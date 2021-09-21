import React from 'react';
import OneCardItemList from '../OneCardItemList';
import ExchangeOfferBox from './ExchangeOfferBox';

class UserCardExchangeItem extends React.Component {

    handleAccept = (exchange) => {
        this.props.handleAccept(exchange);
    }

    handleDecline = (exchange) => {
        this.props.handleDecline(exchange)
    }

    render () {
        // console.log(this.props.exchange)
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
                    <button onClick={() => {this.handleAccept(this.props.exchange)}} className="button primary">Accept Offer</button>
                    <button onClick={() => {this.handleDecline(this.props.exchange)}} className="button primary">Decline Offer</button>
                </div>
            </div>
        )
    }
}

export default UserCardExchangeItem
