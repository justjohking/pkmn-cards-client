import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import OneCardItemList from '../OneCardItemList';
import { Link } from "react-router-dom"
import './OpenForExchange.css';
import Message from '../Message';
import Explanation from '../Explanation';


export class OpenForExchange extends Component {
    state = {
        cards: null
    }

    async componentDidMount() {
        const cards = await apiHandler.getAllOpenEchanges()

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
                <Explanation>
                    <p>Here are all the cards available for an exchange.</p>
                </Explanation>

                <div className="exchange-div">

                    {this.state.cards.length === 0 &&
                    <Message>There are no cards available for an exchange right now.</Message>}

                    {this.state.cards.map(card => {
                        return (
                            <OneCardItemList card={card.pokemonTCGId} key={card._id}>
                                <Link to={"/cards/" + card.pokemonTCGId.id} className="button primary">Card details</Link>
                            </OneCardItemList>
                        )
                    })}
                </div>
                
            </div>
        )
    }
}

export default OpenForExchange
