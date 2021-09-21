import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import FormSale from '../Forms/FormSale';
import ExchangeStatus from './ExchangeStatus';
import Loading from '../Loading/Loading';
import UserSpace from '../../pages/UserSpace/UserSpace';

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
            <UserSpace title="CARDS IN YOUR COLLECTION">
                <p>Total number of cards : {this.state.cards.length}</p>

                <div className="list-cards-container">
                    {this.state.cards.map(card => { return (
                        <div key={card._id}>
                            <img src={card.pokemonTCGId.images.small} alt="pokemon trading game card" />
                            <button onClick={this.callForm} className="button primary">Sell</button>
                            <ExchangeStatus card={card} update={this.updateStatus}/>

                            {this.state.callForm && <FormSale card={card} closeForm={this.closeForm}/>}
                        </div>)
                    })}  
                </div>
            
            </UserSpace>
        )
    }
}

export default CardsList
