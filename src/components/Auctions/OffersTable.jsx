import React, { Component } from 'react'
import "./OffersTable.css";
import OneOffer from './OneOffer';

export class OffersTable extends Component {
    render() {
        console.log(this.props.offers)
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
                            

                            return (
                               <OneOffer 
                               offer={e}
                               onBid={this.props.onBid}
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
