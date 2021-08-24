import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import FormField from "../Forms/FormField"

export class OneUserCardPage extends Component {
    state = {
        user: {},
        card : null,
        isLoggedIn: false,
        initialPrice: 0,
        endDate : ""
    }

    async componentDidMount() {
        try {
            await apiHandler
            .isLoggedIn()
            .then((data) => {
                this.setState({ user: data, isLoggedIn: true});
            })
            .catch((error) => {
                this.setState({ user: null, isLoggedIn: false});
            });

            console.log(this.props)

            const cardInfo = await apiHandler.getOneCard(this.props.card._id);
            this.setState({ card: cardInfo});
            
            // const userCards = await apiHandler.getAllUserCardsFromApiCard(this.state.pokemon.id);
            // this.setState({ userCards: userCards })
        }
        catch (error) {console.error(error)}
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    
    createBid = (event) => {
        event.preventDefault();

        const bid = {
            item: this.props.card._id,
            initialPrice: this.state.initialPrice,
            startDate: Date.now(),
            endDate: this.state.endDate,
            status: "ongoing"
        }
        const bidCreated = apiHandler.createBid(bid)

        console.log("bid created", bidCreated)
    }
    
    render() {
        console.log(this.props)
        
        if(this.state.pokemon === null) return (<div>Loading...</div>)
        else {
            return (
                <div className="OneCard">
                    <div className="container">
                            <div>
                                <h2>SaleForm</h2>
                                <p>Initial Price : {this.props.card.pokemonTCGId.cardmarket.prices.averageSellPrice}</p>
                                <FormField label="Choose a price" htmlFor="initialPrice">
                                    <input 
                                    type='number'
                                    onChange={this.handleChange}
                                    value={this.state.initialPrice}
                                    name='initialPrice'
                                    />
                                </FormField>

                                <FormField label="end of the bid" htmlFor="endDate">
                                    <input 
                                    type="datetime-local"
                                    onChange={this.handleChange}
                                    value={this.state.endTime}
                                    name="endDate"
                                    />
                                </FormField>

                             <button onClick={this.createBid}>Sell</button>
                            </div>
                    </div>
                </div>
            )
        }

    }
}

export default OneUserCardPage
