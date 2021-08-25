import React, { Component } from 'react';

export class SelectCardsBox extends Component {

    handleChange = (event) => {
        this.props.handleChange(event)
    }

    
    render() {
        return (
            <div>
                <p>Select card(s)</p>
                {this.props.cards.map(card => {
                    return(
                        <div key={card._id}>
                            <input type="checkbox" id={card._id} onChange={this.props.handleChange} />
                            <label htmlFor="items">{card.pokemonTCGId.name} – {card._id}</label>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default SelectCardsBox
