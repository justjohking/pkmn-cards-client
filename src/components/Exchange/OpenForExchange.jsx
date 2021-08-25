import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import OneCardItemList from '../CardsList/OneCardItemList';
import { Link } from "react-router-dom"


export class OpenForExchange extends Component {
    state = {
        cards: null
    }

    async componentDidMount() {
        const cards = await apiHandler.getAllCardsOpenForExchange()

        const cardPromises = cards.map(card => {
            return apiHandler.getOneCardFromApi(card.pokemonTCGId);
        })

        const responses = await Promise.all(cardPromises);

        const populatedCards = cards.map((card,i) => {
          return {
              ...card,
              pokemonTCGId: responses[i]
          }
        })

        this.setState({
            cards: populatedCards
        })
        
    }

    render() {
        console.log(this.state.cards)
        if(this.state.cards === null) return (<div>Loading...</div>)

        return (
            <div>
                <h2>Cards open for exchanges</h2>
                {this.state.cards.map(card => {
                    return (
                        <OneCardItemList card={card.pokemonTCGId} key={card._id}>
                            <Link to={"/cards/" + card.pokemonTCGId.id}>Card details</Link>
                        </OneCardItemList>
                    )
                })}
            </div>
        )
    }
}

export default OpenForExchange
