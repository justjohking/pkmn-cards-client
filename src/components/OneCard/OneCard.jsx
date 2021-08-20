import React, { Component } from 'react';
import CardInfo from './CardInfo';


export class OneCard extends Component {
    render() {
        return (
            <div className="CardContainer">
                <div className="div-left">
                    <img src={this.props.pokemon.images.large} alt="card"/>
                    
                    <div className="div-buttons">
                        <button className="btn">{this.props.button}</button> {/* Add the card to a collection */}
                    </div>
                </div>


                <CardContainer 
                pokemon={this.props.pokemon}
                />
            </div>
        )
    }
}

export default OneCard
