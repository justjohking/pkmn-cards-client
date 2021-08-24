import React, { Component } from 'react'
import "./OffersTable.css";
import OneOffer from './OneOffer';

export class OffersTable extends Component {
    render() {
        
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Seller</td>
                            <td>Card State</td>
                            <td>Initial Price</td>
                            <td>Current Bid</td>
                            <td>End date</td>
                            <td>Your offer</td>
                            <td>Confirm</td>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {this.props.offers.map(e => {
                            console.log(e)
                            console.log(e.bid)

                            return (
                               <OneOffer 
                               offer={e}
                            //    currentBid={this.state.currentBid}
                            //    handleChange={this.handleChange}
                            //    handleSubmit={this.handleSubmit}
                               />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OffersTable
