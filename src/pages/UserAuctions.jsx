import React, { Component } from 'react'
import apiHandler from '../api/apiHandler'
import UserAuctionItem from '../components/Auctions/UserAuctionItem'

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
                <h1>User Auctions</h1>
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
