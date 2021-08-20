import React, { Component } from 'react';

export class CardInfo extends Component {

    //Get all the infos about the card being displayed

    render() {
        return (
            <div className="OneCard">

                <div className="img-container">
                    <img src={this.props.pokemon.images.large}></img>
                </div>

                <div className="info-container">

                    <div>
                        <h2 className="pokemon-name">{this.props.pokemon.name}</h2>

                        <div className="pokemon-type">
                            <h3>{this.props.pokemon.subtypes[0]} {this.props.pokemon.supertype}</h3>
                            <p>HP{this.props.pokemon.hp}/</p>
                        </div>
                    </div>

                    <div className="abilities">
                        <h3>{this.props.pokemon.abilities.type}</h3>
                        <p>{this.props.pokemon.abilities.name}</p>
                        <p>{this.props.pokemon.abilities.text}</p>
                    </div>

                    <div className="attacks">
                        <p>{this.props.pokemon.attacks.name} <span>{this.props.pokemon.attacks.damage}</span></p>
                        <p>{this.props.pokemon.attacks.text}</p>
                    </div>

                    <div className="pokemon-div-3">

                        <div className="w-r-rc">
                            <div>
                                <p>Weakness</p>
                                {this.props.pokemon.weaknesses &&
                                    <p>{this.props.pokemon.weaknesses.type} x {this.props.pokemon.weaknesses.value}</p>}
                            </div>
                            <div>
                                <p>Resistance</p>
                                {this.props.pokemon.resistances &&
                                <p>{this.props.pokemon.resistances.type} <span>{this.props.pokemon.weaknesses.value}</span></p>}
                            </div>
                            <div>
                                <p>Retreat Cost</p>
                                {this.props.pokemon.retreatCost &&
                                <p>{this.props.pokemon.retreatCost[0]} x {this.props.pokemon.weaknesses.value}</p>}
                            </div>
                        </div>

                        <div className="pokemon-set">
                            <div>
                            <p>{this.props.pokemon.supertype.series} – {this.props.pokemon.name}</p>
                            <p>{this.props.pokemon.number}/{this.props.pokemon.set.total} {this.props.pokemon.rarity}</p>
                            </div>
                            <img src={this.props.pokemon.set.images.symbol} alt="symbol set" />
                        </div>
                    </div>
                    
                    <div><p>Illustrator : {this.props.pokemon.artist}</p></div>

                </div>
                
            </div>
        )
    }
}

export default CardInfo
