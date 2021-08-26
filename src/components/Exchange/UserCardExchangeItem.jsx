import React from 'react';
import OneCardItemList from '../CardsList/OneCardItemList';
import ExchangeOfferBox from './ExchangeOfferBox';
import apiHandler from '../../api/apiHandler';

class UserCardExchangeItem extends React.Component {

    handleAccept = async () => {
        try {
            // update seller items
            const updatedSellerItem = {
                owner: this.props.exchange.buyer,
                openForExchange: false
            }
            await apiHandler.updateCard(this.props.exchange.sellerItem._id, updatedSellerItem);

            // update buyer items
            const updatedBuyerItem = {
                owner: this.props.exchange.seller,
                openForExchange: false
            }
            const promises = this.props.exchange.buyerItem.map(item => {
                return (
                    apiHandler.updateCard(item._id, updatedBuyerItem)
                )
            })
            await Promise.all(promises)

            await apiHandler.deleteExchange(this.props.exchange._id)

        }
        catch (error) { console.error(error)}
 

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
                    <button>Decline Offer</button>
                </div>
            </div>
        )
    }
}

export default UserCardExchangeItem
