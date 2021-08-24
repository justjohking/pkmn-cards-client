import React, { Component } from 'react';
import FormField from "../Forms/FormField"


export class FormSale extends Component {
    render() {
        return (
            <div>
                <p>Market price : {pokemon.cardmarket.prices.averageSellPrice}</p>
                <FormField label="Choose a price" htmlFor="initialPrice">
                    <input 
                    type='Number'
                    value={this.state.initialPrice}
                    onChange={this.handleChange}
                    name="initialPrice"
                    />
                </FormField>
                <button onClick={() => this.props.putCardOnSale(card._id)}>Sell</button>
            </div>
        )
    }
}

export default FormSale
