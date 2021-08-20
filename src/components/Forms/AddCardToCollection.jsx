import React, { Component } from 'react';
import FormField from './FormField';

export class AddCardToCollection extends Component {
    state = {
        collection: "",
        cardState: "",
        price: 0
    }

    handleChange = (event) => {
        const value = event.target.value;
        const key = event.target.name;

        this.setState({
            [key] : value
        })
    }

    handleSubmit = () => {
        console.log("it works")
    }

    render() {
        return (
            <form onSubmit={this.state.handleSubmit}>

                <FormField label="Add to :" htmlFor="collection">
                    <select name="collection" onChange={this.state.handleChange}>
                        <option value="Owned">my collection</option>
                        <option value="Sell">to sell</option>
                        <option value="Buy">to buy</option>
                    </select>
                </FormField>

                <FormField label="In what state is your card ?" htmlFor="cardState">
                    <select name="cardState" onChange={this.state.handleChange}>
                        <option value="Mint">mint</option>
                        <option value="Near Mint">near mint</option>
                        <option value="Bad">bad</option>
                    </select>
                </FormField>

                <FormField label="At what price do you want to sell your card ?" htmlFor="price">
                    <input
                    type="Number"
                    value={this.state.value}
                    onChange={this.state.handleChange}
                    />
                </FormField>

                <button type="submit">SUBMIT</button>
            </form>
        )
    }
}

export default AddCardToCollection
