import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler'
import ActionButtons from "./ActionButtons"
import CardInfo from "./CardInfo"
import "./OneCard.css";


export class OneCard extends Component {
    state = {
        user: {},
        pokemon : null,
        isLoggedIn: false,
        userCards : [],
        formDisplayed: false
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

            const apiInfo = await apiHandler.getOneCardFromApi(this.props.match.params.id);
            console.log(apiInfo)
            this.setState({ pokemon: apiInfo.data});
            
            const userCards = await apiHandler.getAllUserCardsFromApiCard(this.state.pokemon.id);
            this.setState({ userCards: userCards })
        }
        catch (error) {console.error(error)}
    }


    addCard = async () => {
        try {
            await apiHandler.addCard({pokemonTCGId: this.props.match.params.id});
        } catch (error) {console.error(error)}
    }

    putCardOnSale = async (id) => {
        try {
            await apiHandler.updateCard(id, {onSale: true})
            // await apiHandler.getOneUserCard(id);
            // const foundCollection = await apiHandler.findUserCollection("Sell")
            // const cardsOnSale = foundCollection[0].cards;
            // cardsOnSale.push(id)
            // await apiHandler.addCardToCollection("Sell", {cards: cardsOnSale})
        } catch (error) {console.log(error)}
    }

    // displaySaleForm = () => {
    //     this.setState({
    //         formDisplayed: true
    //     })
    // }
    
    render() {
        if(this.state.pokemon === null) return (<div>Loading...</div>)
        else {
            return (
                <div className="OneCard">
                    <div className="container">
                        <img src={this.state.pokemon.images.large} alt="card"/>
                        <CardInfo pokemon={this.state.pokemon}/>
                    </div>
                    <div>
                    <ActionButtons 
                    addCard={this.addCard} 
                    putCardOnSale={this.putCardOnSale}
                    showForm={this.displaySaleForm}
                    >
                        {this.state}
                    </ActionButtons>
                    </div>
                </div>
            )
        }

    }
}

export default OneCard

