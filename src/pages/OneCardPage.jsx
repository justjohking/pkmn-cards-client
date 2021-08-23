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


    addCard = async (collection) => {
        try {
            const cardToAdd = {
            pokemonTCGId: this.state.pokemon.id,
        }
        // Create a card
            const newUserCard = await apiHandler.addCard(cardToAdd);
            // console.log(newUserCard._id)

        // Find the targeted collection and add the cardId to the array of cards
            const foundCollection = await apiHandler.findUserCollection(collection);
            console.log(foundCollection)
            const updatedCardList = foundCollection[0].cards
            updatedCardList.push(newUserCard._id)
            console.log(updatedCardList)
        
        // Update the collection with the new array
            const updatedCollection =  await apiHandler.addCardToCollection(collection, {cards : updatedCardList});
            console.log(updatedCollection)

        // Get all the cards from all collections 

        } 
        catch (error) {console.error(error)}
    }

    // async componentDidUpdate (prevProps, prevState) {
    //     if (this.state.userCards !== prevState.userCards) {
    //         const userCards = await apiHandler.getOneUserCard(this.state.pokemon.id);
    //         this.setState({
    //             userCards: userCards
    //         })
    //     }
    // }
    
    render() {
        if(this.state.pokemon === null) return (<div>Loading...</div>)
        else {
            return (
                <div className="OneCard">
                    <div className="div-left">

                        <img src={this.state.pokemon.images.large} alt="card"/>

                            <OneCardActions addCard={this.addCard}>{this.state}</OneCardActions>

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
