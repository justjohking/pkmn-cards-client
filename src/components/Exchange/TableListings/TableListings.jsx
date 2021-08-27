import React, { Component } from 'react';
import OneListing from './OneListing'
import "./TableListings.css"
export class TableListings extends Component {

    render() {
        return (
            <div>
                <h3 style={{"margin-left": "50px"}}>All listings open for exchange</h3>
                <table>
                <thead>
                    <tr>
                        <td>Owner</td>
                        <td>Card state</td>
                        <td>What do you wanna exchange ?</td>
                        <td>Your current offer</td>
                        <td>Confirm offer</td>
                    </tr>
                </thead>
                <tbody>
                    {this.props.offers.map(offer => {
                        return (
                            <OneListing listing={offer} pokemon={this.props.pokemon}/>
                        )
                    })}
                </tbody>
            </table>
            </div>
            
        )
    }
}

export default TableListings
