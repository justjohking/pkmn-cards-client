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
            const myExchanges = await apiHandler.getUserCardsOpenForExchange();
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

    render() {
        if(this.state.loading) return <Loading />

        if(this.state.exchanges.length === 0) return <Message>You don't have offers for exchanges yet...</Message>
        
        return (
            <div>
                <h2>Offers for exchange</h2>
                {this.state.exchanges.map(exchange => {
                    return (
                        <UserCardExchangeItem exchange={exchange} />
                    )
                })}
                
            </div>
        )
    }
}

export default UserExchanges