import React, { Component } from 'react';
import "./OneCard.css"

export class CardInfo extends Component {

    //Get all the infos about the card being displayed

    render() {
        return (
            <div className="info-container" >
                <div>
                    <h2 className="pokemon-name">{this.props.pokemon.name}</h2>

                    <div className="pokemon-type">
                        <h3>{this.props.pokemon.subtypes[0]} {this.props.pokemon.supertype}</h3>
                        <p>Health : {this.props.pokemon.hp} HP</p>
                    </div>
                </div>

                <div className="attacks">
                    <h2>Attacks : </h2>
                    {this.props.pokemon.attacks.map(e => {
                        return(
                            <div>
                                <p><b>{e.name}</b><span> {e.damage} </span></p>
                                <p><b>Description : </b>{e.text}</p>
                            </div>
                        )

                    })}


                    {/* <p><b>{this.props.pokemon.attacks[0].name}</b><span> {this.props.pokemon.attacks[0].damage} Damage</span></p>
                    <p>Description : {this.props.pokemon.attacks[0].text}</p>
                    
                    <p><b>{this.props.pokemon.attacks[1].name}</b><span> {this.props.pokemon.attacks[1].damage} Damage</span></p>
                    <p>Description : {this.props.pokemon.attacks[1].text}</p> */}
                </div>

                <div className="pokemon-div-3">

                    <div className="w-r-rc">
                        <h2>Weaknesses : </h2>
                        <div>
                            
                            { this.props.pokemon.weaknesses &&

                            
                            this.props.pokemon.weaknesses.map(e => {
                                return ( 
                                    <div>
                                        <p><b>{e.type} :</b> {e.value}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <h2>Resistances : </h2>
                            {this.props.pokemon.resistances && this.props.pokemon.resistances.map(e => {
                                return (
                                    <div>
                                        <p> <b>{e.type} :</b> {e.value}</p>
                                    </div>
                                )
                            })}
                            
                            {this.props.pokemon.resistances &&
                            <p>{this.props.pokemon.resistances.type} <span>{this.props.pokemon.resistances.value}</span></p>}
                        </div>
                    </div>

                    <div className="set">
                        <h2>Set :</h2>
                        <div>
                            <p><b>{this.props.pokemon.set.name}</b> – {this.props.pokemon.name}</p>
                            <p><b>Rarity : </b>{this.props.pokemon.number}/{this.props.pokemon.set.total} {this.props.pokemon.rarity}</p>
                        </div>
                            <p><b>Set Symbol :</b> </p>
                            <img src={this.props.pokemon.set.images.symbol} alt="symbol set" />
                    </div>
                </div>
                
                <div><p> <b>Illustrator :</b> {this.props.pokemon.artist}</p></div>

            </div>
        )
    }
}

export default CardInfo
