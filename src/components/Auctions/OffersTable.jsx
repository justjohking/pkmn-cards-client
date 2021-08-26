import React, { Component } from 'react'
import "./OffersTable.css";
import OneOffer from './OneOffer';

export class OffersTable extends Component {
    render() {
        return (
            <div>
                <h3>All the auctions</h3>
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
                        {this.props.offers.map(offer => {
                            

                            return (
                               <OneOffer 
                               offer={offer}
                               
                               />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OffersTable;
