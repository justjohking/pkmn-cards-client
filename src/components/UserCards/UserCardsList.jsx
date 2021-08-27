import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import FormSale from '../Forms/FormSale';
import OneCardItemList from '../OneCardItemList';
import BtnExchangeStatus from './BtnExchangeStatus';
import Loading from '../Loading';
import {Link} from "react-router-dom"
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

    callForm = () => {
        this.setState({ callForm : true })
    }

    closeForm = () => {
        this.setState({ callForm : false })
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
                            <button onClick={this.callForm} className="template-button-all-cards">Sell</button>
                        
                        <BtnExchangeStatus card={card} update={this.updateStatus}/>
                        </OneCardItemList>

                    {this.state.callForm && <FormSale card={card} closeForm={this.closeForm}/>}
                    
                    </div>)
                })}
                
            </div>
        )
    }
}

export default CardsList
