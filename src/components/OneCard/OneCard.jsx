import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler'
import ActionButtons from "./ActionButtons"
// import CardInfo from "./CardInfo"
import OffersTable from '../Auctions/OffersTable';
import "./OneCard.css";
import OneCardContainer from './OneCardContainer';
import TableListings from '../Exchange/TableListings/TableListings';
import Loading from '../Loading';


export class OneCard extends Component {
    state = {
        user: {},
        pokemon : null,
        isLoggedIn: false,
        userCards : [],
        formDisplayed: false,
        cardsOnSale: [],
        cardsOpenForExchange: []
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
            
            this.getUserCardsFromModel(this.state.pokemon.id)

            const cardsOnSale = await apiHandler.getCardsOnSale(this.state.pokemon.id);
            this.setState({ cardsOnSale: cardsOnSale });

            const openForExchange = await apiHandler.getAllCardsOneOfApiIdOpenForExchange(this.state.pokemon.id);
            this.setState({ cardsOpenForExchange: openForExchange})
        }
        catch (error) {console.error(error)}
    }

    getUserCardsFromModel = async (TCGId) => {
        try {
            const userCards = await apiHandler.getAllUserCardsFromApiCard(TCGId);
            this.setState({ userCards: userCards });
        } 
        catch (error) {console.log(error)}
    }
    
    addCard = async () => {
        try {
            await apiHandler.addCard({pokemonTCGId: this.props.match.params.id});
            const userCards = await apiHandler.getAllUserCardsFromApiCard(this.state.pokemon.id);
            this.setState({ userCards: userCards })
        } catch (error) {console.error(error)}
    }

    handleBid =  async (event) => {
        try {      
            const cards = await apiHandler.getCardsOnSale(this.state.pokemon.id)
            this.setState({ cardsOnSale: cards })
        } catch (error) {console.error(error)}
    }
    
    
    render() {
        console.log(this.state.userCards)

        if(this.state.pokemon === null) return <Loading />

            return (
                <div className="OneCard">
                    <OneCardContainer pokemon={this.state.pokemon}/>

                    <ActionButtons 
                        addCard={this.addCard} 
                        putCardOnSale={this.putCardOnSale}
                        showForm={this.displaySaleForm}
                    >
                        {this.state}
                    </ActionButtons>
                    
                    <section className="shop-section">
                    <h1>Shop Section</h1>

                    {this.state.cardsOnSale.length > 0 ?
                        <OffersTable  offers={this.state.cardsOnSale} /> :
                        <div>No vendor is currently selling this card.</div>
                    }

                    {this.state.cardsOpenForExchange.length > 0 ? 
                        <TableListings offers={this.state.cardsOpenForExchange} pokemon={this.state.pokemon}/> : 
                        <div>No card is open for exchange for now.</div>
                    }
                    </section>
                </div>
            )
        }

    }


export default OneCard

