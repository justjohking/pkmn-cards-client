import React, { Component } from 'react';
import FormField from '../Forms/FormField';

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleChange = (e) => {
        this.props.handleChange(e.target.value)
    }

    handleClick = () => {
        this.props.handleClick()
    }

    handleReset = () => {
        this.props.handleReset();
    }


    render() {
        return (
            <div className="SearchBar">
                <FormField>
                    <input
                    type="text"
                    value={this.props.name}
                    onChange={this.handleChange}
                    />
                </FormField>
                <div>
                    <button onClick={this.handleClick} className="template-button-all-cards">Search</button>
                    <button onClick={this.handleReset} className="template-button-all-cards">Reset search</button>
                </div>
                    
            </div>
        )
    }
}

export default SearchBar
