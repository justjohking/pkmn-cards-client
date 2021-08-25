import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';

export class OneOffer extends Component {

    state = {
        currentBid: 0,
        bidId: "",
        previousBid: this.props.offer.bid.currentBid
    }

    handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        this.setState({
            [key]: value, 
        })
    }

    handleSubmit = (id) => {
        if(this.state.currentBid < this.state.previousBid) {
            console.log("current bid is too low")
        } else {
            const updatedBid = {currentBid: this.state.currentBid}
            apiHandler.updatedBids(id, updatedBid)
        }
        
    }

    render() {
        return (
            <tr key={this.props.offer._id}>
            <td>{this.props.offer.owner.email}</td>
            <td>{this.props.offer.cardState}</td>
            <td>{this.props.offer.bid.initialPrice} $</td>
            <td>{this.props.offer.bid.currentBid ? `${this.props.offer.bid.currentBid} $` : "Be the first to Bid"}</td>
            <td>{this.props.offer.bid.endDate}</td>
            <td>
                <input 
                    type="number" 
                    name="currentBid" 
                    value={this.state.currentBid}                                          
                    onChange={this.handleChange} 
                    // min={this.props.offer.bid.currentBid}
            />
            </td>
            <td><button onClick={
                () => { this.handleSubmit(this.props.offer.bid._id) 
            }}>Place Bid</button></td>
        </tr>
        )
    }
}

export default OneOffer;

