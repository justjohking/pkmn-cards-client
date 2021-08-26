import React, { Component } from 'react';
import SelectCardsBox from './SelectCardsBox';
import apiHandler from '../../api/apiHandler';
import BtnExchangeStatus from '../UserCards/BtnExchangeStatus';

export class OneListing extends Component {

    state = {
        callBox: false,
        loading: false,
        cards: [],
        exchangeItems: [],
        loadingItems: true,
        exchangeExists: false,
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

        this.setState({
            callBox: false,
            exchangeCreated: true
        })
    }

    getAllUserCards = async () => {
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
            loadingItems: false
        })
    }

    handleClick = () => {
        this.setState({
            loadingItems: true,
            callBox: true,
        })
        this.getAllUserCards();
    }

    async componentDidMount() {
        this.setState({
            loading: false
        })
    }

    render() {
        console.log(this.state.exchangeItems)
        return (
            <tr key={this.props.offer._id}>
                <td>{this.props.offer.owner.email}</td>
                <td>
                    {!this.props.offer.cardState && <p>N/D</p>}
                    {this.props.offer.cardState && this.props.offer.cardState}
                    </td>
                <td>
                    <button onClick={this.handleClick}>Select cards</button>
                    <div>
                    {/* {(this.state.callBox) && 
                    <div><p>Catching all your pokemons... plz hooold</p></div>
                    } */}
                    {(this.state.callBox) &&
                    <SelectCardsBox 
                        getUserCards={this.getUserCards}
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
                    {!this.state.exchangeExists && 
                        <button onClick={this.handleSubmit}>Confirm offer</button>
                    }
                    {this.state.exchangeExists && 
                        <p>Here is your offer</p>}
                    
                    
                </td>
            </tr>
        )
    }
}

export default OneListing;

