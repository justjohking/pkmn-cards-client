import React, { Component } from 'react';
import OneCardItemList from './OneCardItemList';
import apiHandler from '../../api/apiHandler';
import axios from 'axios';


export class AllCards extends Component {
    state = {
        userCards: [],
        cardsApi: [],
        loading: false,
    }
    // We need to show only the pokemons whose cards are present in our DB

    getPokemons = async () => {
        this.setState({
            loading: true
        });
        try {
            const allCards = await apiHandler.getAllCards()
            // console.log(allCards)
            this.setState({
                userCards: allCards,
            })

            let allCardsApi = []

            allCards.forEach(card => {
                axios.get("https://api.pokemontcg.io/v2/cards/" + card.pokemonTCGId)
                .then((res) => {
                    // console.log(res.data.data)
                    allCardsApi.push(res.data.data)
                })
                .catch(error => console.log(error))
            })

            this.setState({
                cardsApi: allCardsApi,
                loading: false
            })
        }
        catch (error) {console.error(error)}
    }
    
    componentDidMount(){
        this.getPokemons();
    }

    render() {
        if(this.state.loading) return <div>Loading...</div>
        
        return (
           <div className="container">
               {/* <h2>ALL CARDS</h2>
            <div style={{ minHeight: "800px", display: "flex", "flexWrap": "wrap" }}>
            {this.state.cards.map(card => (
            <OneCardItemList card={card} />
            ))}
            </div> */}
      </div>
        )
    }
}

export default AllCards

