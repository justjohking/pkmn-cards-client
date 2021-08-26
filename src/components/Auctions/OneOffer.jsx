import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';

export class OneOffer extends Component {

    state = {
        currentBid: 0,
        bidId: "",
        previousBid: this.props.offer.bid.currentBid,
        bid: {},
    }

    async componentDidMount(){
        const bid = await apiHandler.findBid( this.props.offer.bid._id)
        this.setState({
            bid: bid
        })
        console.log("Bid called in oneOffer ",  this.state.bid)
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
            this.setState({
                bid: updatedBid
            })
            this.props.onBid()
        }
        
    }

    finalFunction = async (id) => {
        try {
            await this.handleSubmit(id)
            await this.props.onBid()
        } catch (error) {console.log(error)}
        
    }

    render() {
        return (
            <tr key={this.state.bid._id}>
            <td>{this.props.offer.owner.email}</td>
            <td>{this.props.offer.cardState}</td>
            <td>{this.props.offer.bid.initialPrice} $</td>
            <td>{this.state.bid.currentBid ? `${this.state.bid.currentBid} $` : "Be the first to Bid"}</td>
            <td>{this.props.offer.bid.endDate}</td>
            <td>
                <input 
                    type="number" 
                    name="currentBid" 
                    value={this.state.currentBid}                                          
                    onChange={this.handleChange} 
                    // min={this.state.bid.bid.currentBid}
            />
            </td>
            <td>
                <button  onClick={() => this.handleSubmit(this.state.bid._id)} >
                    Place Bid
                    </button>
                </td>
        </tr>
        )
    }
}

export default OneOffer;

