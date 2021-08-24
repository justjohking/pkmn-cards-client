import React, { Component } from 'react';
import SellCardForm from '../Forms/SellCardForm'
import apiHandler from '../../api/apiHandler';
import ProtectedRoute from "../ProtectedRoute";
import OneCardItemList from './OneCardItemList';

export class CardsList extends Component {
    state = {
        cards: null,
        searchName : ""
    }

    async componentDidMount() {
        const cards = await apiHandler.getAllUserCards();
        // console.log(cards)

        const cardPromises = cards.map(card => {
            return apiHandler.getOneCardFromApi(card.pokemonTCGId)
        })
        // console.log(cardPromises)

        const responses = await Promise.all(cardPromises);

        const populatedCards = cards.map((card, i) => {
            return {
                ...card,
                pokemonTCGId: responses[i].data
            }
        });

        this.setState({
            cards: populatedCards
        })
            
    }

    render() {
        if(this.state.cards === null) return <div>Loading...</div>
        // console.log(this.state.cards)

        return (
            <div className="CardsList">
                <h2>ALL USER'S CARDS</h2>
                {this.state.cards.map(card => {
                    return (
                        <div>
                            <ProtectedRoute exact path="/profile/cards/:id" card={card} component={SellCardForm}/>
                            <OneCardItemList card={card.pokemonTCGId} link={"/profile/cards/" + card._id}/>
                        </div>)
                })}
                
            </div>
        )
    }
}

export default CardsList
