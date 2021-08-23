import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler'
import ActionButtons from "./ActionButtons"
import CardInfo from "./CardInfo"
import "./OneCard.css";


export class OneCardPage extends Component {
    state = {
        user: {},
        pokemon : null,
        isLoggedIn: false,
        userCards : [],
    }

    async componentDidMount() {
        try {
            await apiHandler
            .isLoggedIn()
            .then((data) => {
                this.setState({ user: data, isLoggedIn: true});
            })
            .catch((error) => {
                this.setState({ user: null, isLoggedIn: false});
            });

            const pokemonInfo = await apiHandler.getOneCardFromApi(this.props.match.params.id)
            this.setState({
                pokemon: pokemonInfo.data
            })

            const userCards = await apiHandler.getUserInfoAboutCard(this.state.pokemon.id);
            this.setState({
                userCards: userCards
            })
        }
        catch (error) {console.error(error)}
    }


    addCard = async () => {
        try {
            const cardToAdd = {
            pokemonTCGId: this.state.pokemon.id,
        }
        // Create a card
            await apiHandler.addCard(cardToAdd);
        } 
        catch (error) {console.error(error)}
    }

    putCardOnSale = async (id) => {
        try {
            await apiHandler.getOneUserCard(id);
            const foundCollection = await apiHandler.findUserCollection("Sell")
            const cardsOnSale = foundCollection[0].cards;
            cardsOnSale.push(id)
            await apiHandler.addCardToCollection("Sell", {cards: cardsOnSale})
        }
        catch (error) {console.log(error)}
        


    }
    
    render() {

        if(this.state.pokemon === null) return (<div>Loading...</div>)
        else {
            return (
                <div className="OneCard">
                    <div className="div-left">

                        <img src={this.state.pokemon.images.large} alt="card"/>
                            <ActionButtons addCard={this.addCard} putCardOnSale={this.putCardOnSale}>{this.state}</ActionButtons>
                    </div>

    
                    <CardInfo
                    pokemon={this.state.pokemon}
                    />
                </div>
            )
        }

    }
}

export default OneCardPage

