import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import FormField from "./FormField"

export class SellCardForm extends Component {
    state = {
        user: {},
        card : null,
        isLoggedIn: false,
        initialPrice: 0,
        endDate : "",
        cardState: ""
    }

    async componentDidMount() {
        try {
            const cardInfo = await apiHandler.getOneUserCard(this.props.card._id);
            this.setState({ card: cardInfo});
        }
        catch (error) {console.error(error)}
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    closeForm = () => {
        this.props.closeForm();
    }
    
    createAuction = async (event) => {
        event.preventDefault();

        // create a bid (auction)
        const bid = {
            item: this.props.card._id,
            initialPrice: this.state.initialPrice,
            startDate: Date.now(),
            endDate: this.state.endDate,
            status: "ongoing"
        }
        const bidCreated = await apiHandler.createAuction(bid)
        console.log(bidCreated)
        
        // update the onSale status of the card
        await apiHandler.updateCard(this.props.card._id, {
            onSale: true, 
            price: this.state.initialPrice,
            bid: bidCreated._id,
            cardState: this.state.cardState
        })

        // close the form
        this.closeForm();
    }
    
    render() {
        
        if(this.state.pokemon === null) return (<div>Loading...</div>)
        else {
            return (
                <div className="OneCard">
                    <div className="container">
                            <div>
                                <h2>SaleForm</h2>

                                <FormField label="Select the state of the card you're selling" htmlFor="cardState"> 
                                    <select name="cardState" onChange={this.handleChange}>
                                        <option disabled>Select</option>
                                        <option value="Mint">Mint</option>
                                        <option value="Near Mint">Near Mint</option>
                                        <option value="Bad">Bad</option>
                                    </select>
                                </FormField>
                                <p><b>Initial Price :</b> {this.props.card.pokemonTCGId.cardmarket.prices.averageSellPrice}</p>
                                <FormField label="Choose a price" htmlFor="initialPrice">
                                    <input 
                                    type='number'
                                    onChange={this.handleChange}
                                    value={this.state.initialPrice}
                                    name='initialPrice'
                                    />
                                </FormField>

                                {/* <FormField label="end of the bid" htmlFor="endDate">
                                    <input 
                                    type="datetime-local"
                                    onChange={this.handleChange}
                                    value={this.state.endTime}
                                    name="endDate"
                                    />
                                </FormField> */}

                             <button onClick={this.createAuction} className="button primary">Sell</button>
                            </div>
                    </div>
                </div>
            )
        }

    }
}

export default SellCardForm
