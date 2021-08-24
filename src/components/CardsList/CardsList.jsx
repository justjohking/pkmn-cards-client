import React, { Component } from 'react';
import OneCardItemList from './OneCardItemList';
import apiHandler from '../../api/apiHandler';

export class CardsList extends Component {
    state = {
        cards: null,
        searchName : ""
    }

    async componentDidMount() {
        try{
            const cards = await apiHandler.getAllCards();
            console.log(cards)

            // const cardPromises = cards.map(card => {
            //     return apiHandler.getOneCardFromApi(card.pokemonTCGID)
            // })

            // const responses = await Promise.all(cardPromises);

            // const populatedCards = cards.map((card, i) => {
            //     return {
            //         ...card,
            //         pokemonTCGId: responses[i].data
            //     }
            // })
            // this.setState({
            //     cards: populatedCards
            // })
        }
        catch (error) { console.error(error)}
    }

    render() {
        if(this.state.cards === null) return <div>Loading...</div>

        return (
            <div className="CardsList">
                <h2>ALL USER'S CARDS</h2>
                {/* {this.state.cards.map(card => {
                    <OneCardItemList card={card}/>
                })} */}
                
            </div>
        )
    }
}

export default CardsList
