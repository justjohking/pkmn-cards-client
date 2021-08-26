import React, { Component } from 'react';
import Loading from '../Loading';
import apiHandler from '../../api/apiHandler';
import Message from '../Message';
import UserCardExchangeItem from './UserCardExchangeItem';
import Explanation from '../Explanation';

export class UserExchanges extends Component {

    state = {
        exchanges: null,
        loading: true
    }

    getAllExchangeOffers = async () => {
        try {
            const myExchanges = await apiHandler.getExchangeOffers();
            const promises = myExchanges.map(exchange => {
                return ( 
                    apiHandler.getOneCardFromApi(exchange.sellerItem.pokemonTCGId)
                )
            })
            const responses = await Promise.all(promises)
            const populatedCards = myExchanges.map((exchange, i) => {
                return ( 
                    {...exchange, pokemonTCGId:responses[i]}
                )
            })

            this.setState({
                exchanges: populatedCards,
            })
        }
        catch (error) { console.error(error)}
    }

    // when user accepts an echange, the items exchanged swap owners & exchange gets deleted
    handleAccept = async (exchange) => {
        try {
            // update seller items with id buyer & reset to unavailable for exchanges
            const updatedSellerItem = {
                owner: exchange.buyer,
                openForExchange: false
            }
            const newCard = await apiHandler.updateCard(exchange.sellerItem._id, updatedSellerItem);
            console.log(newCard)

            // update buyer items with id seller & reset to unavailable for exchanges
            const updatedBuyerItem = {
                owner: exchange.seller,
                openForExchange: false
            }
            const promises = exchange.buyerItem.map(item => {
                return (
                    apiHandler.updateCard(item._id, updatedBuyerItem)
                )
            })
            await Promise.all(promises)
            
            //delete exchange
            await apiHandler.deleteExchange(exchange._id)

        }
        catch (error) { console.error(error)};
        
        this.handleClick();
    }

    //when a user declines an offer ==> deletes the exchange.
    handleDecline = async (exchange) => {
        await apiHandler.deleteExchange(exchange._id);
        this.handleClick();
    }

    // calls the API again to update the exchange offers
    handleClick = () => {
        this.getAllExchangeOffers();
    }

    async componentDidMount() {
        this.getAllExchangeOffers();
        
        this.setState({
            loading: false
        })
    }

    render() {
        if(this.state.exchanges === null) return <Loading />
        
        return (
            <div>
                <h2>Offers for exchange</h2>
                    <Explanation>
                        <p>Here are all the offers of exchange you have received.</p>
                    </Explanation>
                
                {this.state.exchanges.length === 0 && 
                <Message>You don't have offers for exchanges yet...</Message>}
        

                {!this.state.loading &&
                    <div>
                    {this.state.exchanges.map(exchange => {
                        return (
                            <UserCardExchangeItem 
                            exchange={exchange} 
                            handleDecline={this.handleDecline}
                            handleAccept={this.handleAccept}
                            />
                        )
                    })}
                </div>}
            
            </div>
        )
    }
}

export default UserExchanges