import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import FormSale from '../Forms/FormSale';
import OneCardItemList from '../OneCardItemList';
import BtnExchangeStatus from './BtnExchangeStatus';
import Loading from '../Loading'

export class CardsList extends Component {
    state = {
        cards: null,
        searchName : ""
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
            const cards = await apiHandler.getAllUserCards();
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
        // try {

        // }
        // catch
        // await apiHandler.getAllUserCardsFromApiCard()
    }

    render() {
        if(this.state.cards === null) return <Loading />

        return (
            <div className="CardsList">
                <h2>ALL USER'S CARDS</h2>
                {this.state.cards.map(card => {
                    return (
                        <div key={card._id}>
                        <OneCardItemList card={card.pokemonTCGId} link={"/profile/cards/" + card._id}>
                        <button>Sell</button>
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
