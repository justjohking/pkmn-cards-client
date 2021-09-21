import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import ExchangeStatus from './ExchangeStatus';
import OnSaleStatus from './OnSaleStatus';
import Loading from '../Loading/Loading';
import "./UserCards.css"

export class CardsList extends Component {
    state = {
        cards: null,
        searchName : "",
        callForm: false
    }

    async componentDidMount() {
        this.getAllCards()
        .then((response) => {
            this.setState({
                cards: response
            })
        })
        .catch(error => console.error(error))  
    }

    getAllCards = async () => {
        try {
            const cards = await apiHandler.getAllUserCards(); //get all the user's card (one element per card, not per tcg model)
            const cardPromises = cards.map(card => {
                return apiHandler.getOneCardFromApi(card.pokemonTCGId);
            })
            const responses = await Promise.all(cardPromises);
            const populatedCards = cards.map((card, i) => {
                return {
                    ...card,
                    pokemonTCGId: responses[i]
                }
            });
            return populatedCards 
        }
        catch (error) {console.error(error)}
    }

    updateStatus = () => {
        this.getAllCards()
    }

    render() {
        if(this.state.cards === null) return <Loading />

        return (
            <div className="UserCardsList">
                <h2>CARDS IN YOUR COLLECTION ({this.state.cards.length})</h2>

                <div className="list-cards">
                    {this.state.cards.map(card => { return (
                        <div className="card-container profile" key={card._id}>
                            <div>
                                <img src={card.pokemonTCGId.images.small} alt="pokemon trading game card" />
                            </div>
                            <div className="info-container">
                                <OnSaleStatus card={card} />
                                <ExchangeStatus card={card} />
                            </div>
                        </div>
                        )
                    })}  
                </div>
            </div>
        )
    }
}

export default CardsList
