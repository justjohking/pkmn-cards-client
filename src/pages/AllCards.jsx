import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import apiHandler from '../api/apiHandler';
import OneCardMini from '../components/OneCardMini';

export class AllCardsFromApi extends Component {
    state = {
        cards: [],
    }
    // We need to show only the pokemons whose cards are present in our DB


    async componentDidMount(){
        
        try {
            const pokemonCards = await apiHandler.getItems()
            this.setState({cards: pokemonCards}, () => console.log(this.state.cards))
        } catch (err) {
            console.log(err)
        }
    }

    render() {

        if(this.state.cards.length === 0) return (<div>Loading...</div>)
        else return (
            <div>
                {this.state.cards.map(element => {
                   return <OneCardMini card={element}/>
               })}
                
            </div>
        )
    }
}

export default AllCardsFromApi
