import React, { Component } from 'react'
import FormField from './FormField'

export class BiddingForm extends Component {
    state = { 
        currentBid: 0,
        
    }

    

    render() {
        return (
            <div>
                <FormField label="Bid" htmlFor="currentBid">
                    <input type="number" name="currentBid" value={this.state.currentBid} onChange={this.handleChange}  />
                    <button onSubmit={this.handleSubmit}>Bid ! </button>
                </FormField>
            </div>
        )
    }
}

export default BiddingForm
