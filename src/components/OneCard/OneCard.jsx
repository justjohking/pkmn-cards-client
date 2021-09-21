import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler'
import ActionButtons from "./ActionButtons"
// import CardInfo from "./CardInfo"
import OffersTable from '../Auctions/AuctionsListings/OffersTable';
import "./OneCard.css";
import OneCardContainer from './OneCardContainer';
import TableListings from '../Exchange/TableListings/TableListings';
import Loading from '../Loading/Loading';
import { withUser } from '../Auth/withUser';


export class OneCard extends Component {
    state = {
        loading: true,
        pokemon : null,
        userCards : [],
        formDisplayed: false,
        cardsOnSale: [],
        cardsOpenForExchange: [],
        message: ""
    }

    // get all the info about this card model
    getInfoCardFromApi = async (tcgId) => {
        await apiHandler.getOneCardFromApi(tcgId)
        .then((response) => { this.setState({ pokemon: response}) })
        .catch((error) => { console.log(error) })
    }

    // get all the cards the user has in a specifique pokemon card model
    getUserCardsFromModel = async (tcgId) => {
        await apiHandler.getAllUserCardsFromApiCard(tcgId)
        .then((response) => { this.setState({ userCards: response }) })
        .catch((error) => { console.log(error) })
    }

    // get all the ongoing auctions for this model
    getOngoingAuctions = async (tcgId) => {
        await apiHandler.getAuctionsForTCGCard(tcgId)
        .then((cards) => { this.setState({ cardsOnSale : cards }) })
        .catch((error) => { console.log(error) })
    }

    // get all the cards of this model open for exchange
    getCardsOpenForExchange = async (tcgId) => {
        await apiHandler.getAllOpenEchangesForTCGCard(tcgId)
        .then((response) => { this.setState({ cardsOpenForExchange: response })})
        .catch((error) => { console.log(error) })
    }

    // add the card to the user's collection ("My Cards") --> indicate that the owner owns a version of it
    addCard = async () => {
        try {
            await apiHandler.addCard({pokemonTCGId: this.props.match.params.id});
            const userCards = await apiHandler.getAllUserCardsFromApiCard(this.state.pokemon.id);
            this.setState({ userCards: userCards })
        } catch (error) {console.error(error)}
    }

    updateAuction = (id) => {
        this.getOngoingAuctions(id)
    }

    async componentDidMount() {
        await this.getInfoCardFromApi(this.props.match.params.id);
        await this.getUserCardsFromModel(this.props.match.params.id)
        await this.getOngoingAuctions(this.props.match.params.id);
        await this.getCardsOpenForExchange(this.props.match.params.id)
        await this.setState({ loading : false })
    }
    
    
    render() {
        if (this.state.loading) return <Loading />

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
                    <h1>How to get this card ?</h1>

                    {this.state.cardsOnSale.length > 0 ?
                        <OffersTable  
                        auctions={this.state.cardsOnSale} 
                        updateAuction={this.updateAuction}
                        /> :
                        <div>There are no ongoing auctions for this model.</div>
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


export default withUser(OneCard);

