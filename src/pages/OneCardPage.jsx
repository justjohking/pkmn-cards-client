import React, { Component } from 'react';
import apiHandler from '../api/apiHandler';
import OneCardActions from '../components/OneCard/OneCardActions';
import CardInfo from '../components/OneCard/CardInfo';
import "../components/OneCard/OneCard.css";


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
            // console.log(userCards)
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
            // console.log(newUserCard._id)

        // Find the targeted collection and add the cardId to the array of cards
            // const foundCollectionRes = await apiHandler.findUserCollection("Owned");
            // console.log("before owned collection", foundCollectionRes)
            // const foundCollectionCards = foundCollectionRes[0].cards
            // const updatedCardList = foundCollectionCards.push(newUserCard._id)
        
        // Update the collection with the new array
            // const updatedCollection = await apiHandler.addCardToCollection("Owned", {cards : updatedCardList});
            // console.log("updated Owned collection", updatedCollection)
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
                            <OneCardActions addCard={this.addCard} putCardOnSale={this.putCardOnSale}>{this.state}</OneCardActions>
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
