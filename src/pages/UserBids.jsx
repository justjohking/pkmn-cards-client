import React, { Component } from 'react'

import apiHandler from '../api/apiHandler'
import OneBid from '../components/Bids/OneBid'

export class UserBids extends Component {
    state = {
        bids: []
    }
    
    async componentDidMount(){
        const myBids = await apiHandler.findUserBids()
        const promises = myBids.map(e => {
            return ( 
                apiHandler.getOneCardFromApi(e.item.pokemonTCGId)
            )
        })

        const responses = await Promise.all(promises)
        const populatedBids = myBids.map((bid, i) => {
            return ( 
                {...bid, pokemonTCGId:responses[i].data}
            )
        })

        this.setState({
            bids: populatedBids,
        })
        console.log(this.state.bids)
    }





    render() {
        return (
            
            <div>
                <h1>Hello</h1>
                <div>
                    {this.state.bids.map(e => {
                        return (
                            
                            <OneBid bid={e} />
                            
                            
                        )
                        
                    })}
                </div>
            </div>
        )
    }
}

export default UserBids
