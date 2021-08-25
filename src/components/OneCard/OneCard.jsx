import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler'
import ActionButtons from "./ActionButtons"
import CardInfo from "./CardInfo"
import OffersTable from './OffersTable';
import "./OneCard.css";


export class OneCard extends Component {
    state = {
        user: {},
        pokemon : null,
        isLoggedIn: false,
        userCards : [],
        formDisplayed: false,
        cardsOnSale: [],
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


            
            const apiInfo = await apiHandler.getOneCardFromApi(this.props.match.params.id);
            this.setState({ pokemon: apiInfo});
            
            const userCards = await apiHandler.getAllUserCardsFromApiCard(this.state.pokemon.id);
            this.setState({ userCards: userCards })


            const cards = await apiHandler.getCardOnSale(this.state.pokemon.id)
            this.setState({ cardsOnSale: cards }); 

            
        }
        catch (error) {console.error(error)}
    }

    
    
    addCard = async () => {
        try {
            await apiHandler.addCard({pokemonTCGId: this.props.match.params.id});
            const userCards = await apiHandler.getAllUserCardsFromApiCard(this.state.pokemon.id);
            this.setState({ userCards: userCards })
        } catch (error) {console.error(error)}
    }

    
    
    render() {

        

        if(this.state.pokemon === null) return (<div>Loading...</div>)

            return (
                <div className="OneCard">
                    <div className="container">
                        <img src={this.state.pokemon.images.large} alt="card"/>
                        <CardInfo pokemon={this.state.pokemon}/>
                    </div>
                    <div>
                    <ActionButtons 
                    addCard={this.addCard} 
                    putCardOnSale={this.putCardOnSale}
                    showForm={this.displaySaleForm}
                    >
                        {this.state}
                    </ActionButtons>

                    {this.state.cardsOnSale.length > 0 ?
                        <OffersTable  offers={this.state.cardsOnSale} /> :
                        <div>No vendor is currently selling this card.</div>
                    }


                  
                    </div>
                </div>
            )
        }

    }


export default OneCard

