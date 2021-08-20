import React, { Component } from 'react';
import FormField from '../Forms/FormField'

export class AddCardToCollection extends Component {
    render() {
        return (
            <FormField label="Add to :" htmlFor="collection">
                    <select name="collection">
                        <option selected>select a collection</option>
                        <option value="Owned">my collection</option>
                        <option value="Sell">to sell</option>
                        <option value="Buy">to buy</option>
                    </select>
            </FormField>
        )
    }
}

export default AddCardToCollection
