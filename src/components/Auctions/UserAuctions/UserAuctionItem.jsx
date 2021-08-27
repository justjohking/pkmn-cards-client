import React, { Component } from 'react';
import apiHandler from '../../../api/apiHandler';
import OneCardItemList from '../../OneCardItemList'

export class UserAuctionItem extends Component {
    
    // accept the highest bid for an auction
    handleAccept = async () => {

        // update the owner of the card
        const card = this.props.auction.item
        const updatedCard = {
            owner: this.props.auction.buyer,
            onSale: false,
            price: null,
        }
        await apiHandler.updateCard(card._id, updatedCard)

        // delete "bid" (auction)
        await apiHandler.deleteBid(this.props.auction._id)
        console.log("bid finished")
    }

    // cancel the auction ==> delete "bid" (auction)
    handleDelete = async () => {
        await apiHandler.deleteBid(this.props.auction._id)
        console.log("bid deleted")
    }
    
    render() {
        console.log(this.props)
        return (
            <div key={this.props.auction._id}> 
                <OneCardItemList card={this.props.auction.pokemonTCGId}/>
                <div>Current Offer : {this.props.auction.currentBid}</div>
                <button onClick={this.handleAccept} className="template-button-all-cards">Accept the offer</button>
                <button onClick={this.handleDelete} className="template-button-all-cards">Remove card from sale</button>
            </div>
        )
    }
}

export default UserAuctionItem
