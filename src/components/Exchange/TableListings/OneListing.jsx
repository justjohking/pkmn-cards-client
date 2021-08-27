import React, { Component } from 'react';
import SelectCardsBox from './SelectCardsBox';
import apiHandler from '../../../api/apiHandler';

export class OneListing extends Component {

    state = {
        callBox: false,
        loading: false,
        cards: [],
        exchangeItems: [],
        loadingItems: true,
        exchangeExists: false,
    }

    // add a card to the user's offer (before confirming)
    addCard = (card) => {
        let array = this.state.exchangeItems;
        array.push(card)
        this.setState({
            exchangeItems : array
        })
    }

    // delete a card from the user's offer (before confirming)
    deleteCard = (card) => {
        let array = [...this.state.exchangeItems];
        let newArr = array.filter(e => e !== card);
        this.setState({ exchangeItems : newArr })
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
            seller : this.props.listing.owner._id,
            sellerItem : this.props.listing._id,
            buyerItem : this.state.exchangeItems
        }
        try {
            await apiHandler.createExchange(exchangeOffer);
            this.setState({
                callBox: false,
            });
            this.getTheExchange(this.props.listing._id)
        }
        catch (error) {console.error(error)}
    }

    // get all cards that the user owns
    getAllUserCards = async () => {
        {this.setState({ loading : true })}
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

    getTheExchange = async (id) => {
        await apiHandler.getExchangeBySellerItem(id)
        .then((response) => {
            response.length > 0 ? 
            this.setState({ exchangeExists : true }) : 
            this.setState({ exchangeExists : false })
            
        })
        .catch((error) => {
            console.log(error);
            this.setState({ exchangeExists : false})
        })
    }

    async componentDidMount() {
        this.setState({
            loading: false
        })
        this.getTheExchange(this.props.listing._id);
    }

    render() {
        return (
            <tr key={this.props.listing._id}>
                <td>{this.props.listing.owner.email}</td>
                <td>
                    {!this.props.listing.cardState && <p>N/D</p>}
                    {this.props.listing.cardState && this.props.listing.cardState}
                    </td>
                <td>
                    <button onClick={this.handleClick} className="template-button-all-cards">Select cards</button>
                    <div>
                    {this.state.callBox && this.state.loadingItems &&
                    <div><p>Catching all your pokemons... plz hooold</p></div>
                    }
                    {(this.state.callBox) &&
                    <SelectCardsBox 
                        getUserCards={this.getUserCards}
                        cards={this.state.cards}
                        exchangeItems={this.state.exchangeItems}
                        handleChange={this.handleChange}
                    />
                    }
                    {this.state.callBox && 
                    this.state.cards.length === 0 &&
                    !this.state.loading &&
                    <div>You have no cards to exchange !</div>}
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
                    {/* {!this.state.exchangeExists &&  */}
                        <button onClick={this.handleSubmit} className="template-button-all-cards">Confirm offer</button>
                    {/* } */}
                    {/* {this.state.exchangeExists &&
                        <p>Here is your offer</p>} */}
                    
                    
                </td>
            </tr>
        )
    }
}

export default OneListing;

