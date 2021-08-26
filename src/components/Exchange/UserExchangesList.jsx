import React, { Component } from 'react';
import Loading from '../Loading';
import apiHandler from '../../api/apiHandler';
import Message from '../Message';
import UserCardExchangeItem from './UserCardExchangeItem';

export class UserExchanges extends Component {

    state = {
        exchanges: null,
        loading: true
    }

    async componentDidMount() {
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
                loading: false
            })
        }
        catch (error) { console.error(error)}
    }


    handleAccept = async () => {
        console.log("handle accept works")
        try {
            // update seller items
            const updatedSellerItem = {
                owner: this.state.exchanges.buyer,
                openForExchange: false
            }
            await apiHandler.updateCard(this.state.exchanges.sellerItem._id, updatedSellerItem);

            // update buyer items
            const updatedBuyerItem = {
                owner: this.state.exchanges.seller,
                openForExchange: false
            }
            const promises = this.state.exchanges.buyerItem.map(item => {
                return (
                    apiHandler.updateCard(item._id, updatedBuyerItem)
                )
            })
            await Promise.all(promises)

            await apiHandler.deleteExchange(this.state.exchanges._id)

        }
        catch (error) { console.error(error)};
    }

    handleDecline = async () => {
        console.log("handle decline works")
        await apiHandler.deleteExchange(this.state.exchanges._id)
    }

    render() {
        console.log(this.state.exchanges)
        if(this.state.loading) return <Loading />

        if(this.state.exchanges.length === 0) return <Message>You don't have offers for exchanges yet...</Message>
        
        return (
            <div>
                <h2>Offers for exchange</h2>
                {this.state.exchanges.map(exchange => {
                    return (
                        <UserCardExchangeItem 
                        exchange={exchange} 
                        handleDecline={this.handleDecline}
                        handleAccept={this.handleAccept}
                        />
                    )
                })}
                
            </div>
        )
    }
}

export default UserExchanges