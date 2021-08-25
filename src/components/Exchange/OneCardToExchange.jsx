import React, { Component } from 'react';
import SelectCardsDialog from './SelectCardsDialog';

export class OneCardToExchange extends Component {

    render() {
        console.log(this.props)
        return (
            <tr key={this.props.offer._id}>
                <td>{this.props.offer.owner.email}</td>
                <td>{this.props.offer.cardState}</td>
                <td>{this.props.pokemon.cardmarket.prices.averageSellPrice}</td>
                <td><button><SelectCardsDialog /></button></td>
            </tr>
        )
    }
}

export default OneCardToExchange

