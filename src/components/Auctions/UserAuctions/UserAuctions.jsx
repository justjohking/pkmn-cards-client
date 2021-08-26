import React, { Component } from 'react';
import apiHandler from '../../../api/apiHandler';
import UserAuctionItem from './UserAuctionItem';
import Message from '../../Message';

export class UserAuctions extends Component {
    state = {
        auctions: []
    }
    
    async componentDidMount(){
        const myAuctions = await apiHandler.findUserAuctions()
        const promises = myAuctions.map(auction => {
            return ( 
                apiHandler.getOneCardFromApi(auction.item.pokemonTCGId)
            )
        })
        const responses = await Promise.all(promises)
        const populatedBids = myAuctions.map((auction, i) => {
            return ( 
                {...auction, pokemonTCGId:responses[i]}
            )
        })
        this.setState({
            auctions: populatedBids,
        })
    }
    render() {
        return (
            
            <div>
                <h1>Your auctions</h1>
                <p>Here are all the bids you received for your ongoing auctions.</p>
                
                {/* If the user hasn't receive any bid for his auctions yet.*/}
                {this.state.auctions.length === 0 && 
                <Message>
                    <p>You don't have any bids from your open auctions right now.</p>
                </Message>}

                <div>
                    {this.state.auctions.map(e => {
                        return (                           
                            <UserAuctionItem auction={e} />
                        )                      
                    })}
                </div>
            </div>
        )
    }
}

export default UserAuctions
