import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './SelectCardsBox.css';

export class SelectCardsBox extends Component {

    handleChange = (event) => {
        this.props.handleChange(event)
    }

    handleClick = () => {
        this.props.handleClick()
    }

    // get all the Pokemons
    
    render() {
        return (
            <div>
                <Dropdown className="dropdown-cards">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select the card(s)
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                {this.props.cards.map((card, i) => {
                    return(
                        <div key={card._id}>
                            <Dropdown.Item href={`#/action-${i}`} className="dropdown-item">
                                <div className="dropdown-cards">
                                <input type="checkbox" id={card._id} onChange={this.props.handleChange} className="dropdown-checkbox"/>
                                <label htmlFor="items">{card.pokemonTCGId.name} – {card._id}</label>
                                </div>
                                
                            </Dropdown.Item>
                        </div>
                    )
                })}
                </Dropdown.Menu>
                </Dropdown>
                
            </div>
        )
    }
}

export default SelectCardsBox
