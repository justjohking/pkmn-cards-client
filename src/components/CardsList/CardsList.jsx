import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import FormSale from '../Forms/FormSale';
import OneCardItemList from './OneCardItemList';
import BtnExchangeStatus from './BtnExchangeStatus'
import {Link} from "react-router-dom"
import "./CardsList.css"
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
                pokemonTCGId: responses[i]
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
                        <div key={card._id} className="oneCard">
                        <OneCardItemList card={card.pokemonTCGId} link={"/profile/cards/" + card._id}>
                            <Link to={`/cards/${card.pokemonTCGId.id}`}>Card details</Link>
                            <BtnExchangeStatus card={card}/>
                        </OneCardItemList>
                        
                    <FormSale card={card}/>
                    </div>)
                })}
                
            </div>
        )
    }
}

export default CardsList
