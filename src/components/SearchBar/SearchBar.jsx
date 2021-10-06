import React, { Component } from 'react';
import './SearchBar.css'

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleChange = (event) => {
        this.props.handleChange(event)
        console.log('it works', event)
    }

    handleSubmit = () => {
        this.props.handleSubmit()
    }

    handleReset = () => {
        this.props.handleReset();
    }


    render() {
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>

                <div className="criteria">
                    <label htmlForm="search-name">Name of a Pokemon</label>
                    <input
                    id="search-name"
                    type="text"
                    value={this.props.name}
                    onChange={this.handleChange}
                    name="name"
                    />
                </div>

                <div className="criteria">
                    <label htmlFor="search-auction">Auctions</label>
                    <input 
                    name='onSale'
                    type="checkbox"
                    value={this.props.onSale}
                    onChange={this.handleChange}
                    id='search-auction'
                    />
                </div>

                <div className="criteria">
                    <label htmlFor="search-exchange">Exchanges</label>
                    <input 
                    name="openForExchange"
                    id="search-exchange"
                    type="checkbox"
                    value={this.props.openForExchange}
                    onChange={this.handleChange}
                    />
                </div>

                <div>
                    <button type="submit" className="button primary">Search</button>
                    <button onClick={this.handleReset} className="button primary">Reset search</button>
                </div>
                    
            </form>
        )
    }
}

export default SearchBar
