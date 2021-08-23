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

            const userCards = await apiHandler.getOneUserCard(this.state.pokemon.id);
            this.setState({
                userCards: userCards
            })
            // console.log(userCards)
        }
        catch (error) {console.error(error)}
    }

    async componentDidUpdate (prevProps, prevState) {
        if (this.state !== prevState) {
            const pokemonInfo = await apiHandler.getOneCardFromApi(this.props.match.params.id)
            this.setState({
            pokemon: pokemonInfo.data
        })
        }
    }

    addCard = async (collection) => {
        try {
            const cardToAdd = {
            pokemonTCGId: this.state.pokemon.id,
        }
        //CREATE A CARD
            const newUserCard = await apiHandler.addCard(cardToAdd);
            // console.log(newUserCard._id)

        // FIND THE OWNED COLLECTION AND ADD CARD TO NEW ARRAY
            const foundCollection = await apiHandler.findUserCollection(collection);
            const updatedCardList = foundCollection[0].cards
            updatedCardList.push(newUserCard._id)
            // console.log(updatedCardList)
        
        // UPDATE THE COLLECTION WITH THE NEW ARRAY
            const updatedCollection = await apiHandler.addCardToCollection(collection, {cards : updatedCardList});
            // console.log(updatedCollection)
        } 
        catch (error) {console.error(error)}
    }
    
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
/* 
For the buttons :
*/