import React, { Component } from 'react';
import SelectCardsBox from './SelectCardsBox';
import apiHandler from '../../api/apiHandler';

export class OneListing extends Component {

    state = {
        loading: true,
        cards: [],
        exchangeItems: []
    }

    addCard = (card) => {
        let array = this.state.exchangeItems;
        array.push(card)
        this.setState({
            exchangeItems : array
        })
    }

    deleteCard = (card) => {
        let array = [...this.state.exchangeItems];
        let newArr = array.filter(e => e !== card);
        this.setState({
            exchangeItems : newArr
        })
    }

    handleChange = (event) => {
        if(event.target.checked) {
            this.addCard(event.target.id)
        } 
        else {
            this.deleteCard(event.target.id)
        }
    }

    handleSubmit = async () => {
        const exchangeOffer = {
            seller : this.props.offer.owner._id,
            sellerItem : this.props.offer._id,
            buyerItem : this.state.exchangeItems
        }
        try {
            await apiHandler.createExchange(exchangeOffer)
        }
        catch (error) {console.error(error)}
    }

    async componentDidMount() {
        const cards =  await apiHandler.getAllUserCards();
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
            cards: populatedCards, 
            loading: false
        })
    }

    render() {
        return (
            <tr key={this.props.offer._id}>
                <td>{this.props.offer.owner.email}</td>
                <td>{this.props.offer.cardState}</td>
                <td>{this.props.pokemon.cardmarket.prices.averageSellPrice}</td>
                <td>
                    <div>
                    {(this.state.loading) && 
                    <div><p>Catching all your pokemons... plz hooold</p></div>
                    }
                    {(!this.state.loading) && 
                    <SelectCardsBox 
                    cards={this.state.cards}
                    exchangeItems={this.state.exchangeItems}
                    handleChange={this.handleChange}
                    />
                    }
                    </div>
                </td>
                <td>
                    <ul>
                        {this.state.exchangeItems.map(item => {
                            return (
                                <li>{item}</li>
                            )
                        }) }
                    </ul>
                </td>
                <td>
                    <button onClick={this.handleSubmit}>Confirm offer</button>
                </td>
            </tr>
        )
    }
}

export default OneListing;

