import React, { Component } from 'react';
import './SearchBar.css'

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
            <form className="search-form">

                <div className="criteria">
                    <label htmlForm="search-name">Name of a Pokemon</label>
                    <input
                    id="search-name"
                    type="text"
                    value={this.props.name}
                    onChange={this.handleChange}
                    />
                </div>

                <div className="criteria">
                    <label htmlFor="search-auction">Auctions</label>
                    <input 
                    type="checkbox"
                    value={this.props.auction}
                    onChange={this.handleChange}
                    id='search-auction'
                    />
                </div>

                <div className="criteria">
                    <label htmlFor="search-exchange">Exchanges</label>
                    <input 
                    id="search-exchange"
                    type="checkbox"
                    value={this.props.exchange}
                    onChange={this.handleChange}
                    />
                </div>

                <div>
                    <button onClick={this.handleClick} className="main-button">Search</button>
                    <button onClick={this.handleReset} className="main-button">Reset search</button>
                </div>
                    
            </form>
        )
    }
}

export default SearchBar
