import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler'

export class OneBid extends Component {
    state = { 
        bidId: this.props.bid._id,
    }
    
    handleAccept = async () => {
        const card = this.props.bid.item
        const updatedCard = {
            owner: this.props.bid.buyer,
            onSale: false,
            price: null,
        }
        await apiHandler.updateCard(card._id, updatedCard)
        await apiHandler.deleteBid(this.props.bid._id)
        console.log("bid finished")
    }
    
    render() {
        return (
            <div> 
                        <img src={this.props.bid.pokemonTCGId.images.small} alt="" />
                        <div>{this.props.bid.pokemonTCGId.name}</div>
                        <div>Current Offer : {this.props.bid.currentBid}</div>
                        <button onClick={this.handleAccept}>Accept the offer</button>
                        <button>Remove card from sale</button>
            </div>
        )
    }
}

export default OneBid
