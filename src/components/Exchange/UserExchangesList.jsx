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
        this.setState({
            loading: false
        })
    }


    // handleAccept = async () => {
    //     try {
    //         console.log("handle accept work")
    //         // update seller items
    //         const updatedSellerItem = {
    //             owner: this.state.exchanges.buyer,
    //             openForExchange: false
    //         }
    //         const newCard = await apiHandler.updateCard(this.state.exchanges.sellerItem._id, updatedSellerItem);
    //         console.log(newCard)

    //         // update buyer items
    //         const updatedBuyerItem = {
    //             owner: this.state.exchanges.seller,
    //             openForExchange: false
    //         }
    //         const promises = this.state.exchanges.buyerItem.map(item => {
    //             return (
    //                 apiHandler.updateCard(item._id, updatedBuyerItem)
    //             )
    //         })
    //         await Promise.all(promises)

    //         await apiHandler.deleteExchange(this.state.exchanges._id)

    //     }
    //     catch (error) { console.error(error)};
    // }

    handleAccept = async (exchange) => {
        try {
            // update seller items with id buyer
            const updatedSellerItem = {
                owner: exchange.buyer,
                openForExchange: false
            }
            const newCard = await apiHandler.updateCard(exchange.sellerItem._id, updatedSellerItem);
            console.log(newCard)

            // update buyer items with id seller
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
    }

    handleDecline = async () => {
        await apiHandler.deleteExchange()
    }

    render() {
        if(this.state.exchanges === null) return <Loading />

        if(this.state.exchanges.length === 0) return <Message>You don't have offers for exchanges yet...</Message>
        
        return (
            <div>
                <h2>Offers for exchange</h2>

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