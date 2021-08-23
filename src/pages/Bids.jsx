import React, { Component } from 'react'
import apiHandler from '../api/apiHandler'

export class Bids extends Component {
    
    state = { 
        collection: []
    }

    componentDidMount(){
        const sellCollections = apiHandler.findBids("Sell")
        const cards = sellCollections
        console.log(cards)
        this.setState({
            collection: sellCollections
        })
       
    }

    render() {
        return (
            <div>
                <h1>Bidding Page</h1>
            </div>
        )
    }
}

export default Bids
