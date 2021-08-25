import React, { Component } from 'react';
import OneCardToExchange from './OneCardToExchange'

export class TableCardsOpenForExchange extends Component {
    render() {
        return (
            <div>
                <h3>All listings open for exchange</h3>
                <table>
                <thead>
                    <tr>
                        <td>Owner</td>
                        <td>Card state</td>
                        <td>Average Sell Price</td>
                        <td>What do you wanna exchange ?</td>
                    </tr>
                </thead>
                <tbody>
                    {this.props.offers.map(offer => {
                        return (
                            <OneCardToExchange offer={offer} pokemon={this.props.pokemon}/>
                        )
                    })}
                </tbody>
            </table>
            </div>
            
        )
    }
}

export default TableCardsOpenForExchange
