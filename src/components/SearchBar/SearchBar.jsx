import React, { Component } from 'react';
import FormField from '../Forms/FormField';

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleNameInputChange = this.handleNameInputChange.bind(this);
    }

    handleNameInputChange(e) {
        this.props.handleNameInputChange(e.target.value)
    };

    render() {
        return (
            <div className="SearchBar">
                <form onSubmit={this.props.onSubmit}>
                    <FormField>
                        <input
                        type="text"
                        value={this.props.name}
                        onChange={this.handleNameInputChange}
                        name="name"
                        />
                    </FormField>
                    <button type='submit'>Search</button>

                </form>
            </div>
        )
    }
}

export default SearchBar
