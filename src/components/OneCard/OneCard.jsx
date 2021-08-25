import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler'
import ActionButtons from "./ActionButtons"
// import CardInfo from "./CardInfo"
import OffersTable from '../Bids/OffersTable';
import "./OneCard.css";
import OneCardContainer from './OneCardContainer';
import TableCardsOpenForExchange from '../Exchange/TableCardsOpenForExchange';


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
            
            const userCards = await apiHandler.getAllUserCardsFromApiCard(this.state.pokemon.id);
            this.setState({ userCards: userCards });

<<<<<<< HEAD
            const cardsOnSale = await apiHandler.getCardsOnSale(this.state.pokemon.id);
            this.setState({ cardsOnSale: cardsOnSale });

            const openForExchange = await apiHandler.getAllCardsOneOfApiIdOpenForExchange(this.state.pokemon.id);
            this.setState({ cardsOpenForExchange: openForExchange})
=======

            const cards = await apiHandler.getCardOnSale(this.state.pokemon.id)
            this.setState({ cardsOnSale: cards }); 

            
            
            
            
>>>>>>> 30bd0ebde349e4ab20a1a3750668357bcbbcb35d
        }
        catch (error) {console.error(error)}
    }

<<<<<<< HEAD
        // async componentDidUpdate(){
        //     try {
                
        //         // const apiInfo = await apiHandler.getOneCardFromApi(this.props.match.params.id);
        //         // this.setState({ pokemon: apiInfo});
                
        //         const userCards = await apiHandler.getAllUserCardsFromApiCard(this.state.pokemon.id);
        //         this.setState({ userCards: userCards })

        //         const cards = await apiHandler.getCardOnSale(this.state.pokemon.id)
        //         this.setState({ cardsOnSale: cards })
                
    
        //     }catch(error) {console.log(error)}
        // }
=======
    // componentDidUpdate(prevProps, prevState){


                               
    //                 if (this.state.pokemon !== null && this.state.cardsOnSale !== prevState.cardsOnSale)  {
                         
    //                     const cards =  apiHandler.getCardOnSale(this.state.pokemon.id)

    //                     if(cards !== this.state.cardsOnSale) { 
    //                         console.log("here set state ")
    //                     }

    //                 }

                    
                   
                    
        
                
            
    //     }
>>>>>>> 30bd0ebde349e4ab20a1a3750668357bcbbcb35d
    
    
    addCard = async () => {
        try {
            await apiHandler.addCard({pokemonTCGId: this.props.match.params.id});
            const userCards = await apiHandler.getAllUserCardsFromApiCard(this.state.pokemon.id);
            this.setState({ userCards: userCards })
        } catch (error) {console.error(error)}
    }
<<<<<<< HEAD
   
=======

    
    handleBid =  async (event) => {
        try {
            
            const cards = await apiHandler.getCardOnSale(this.state.pokemon.id)
            this.setState({ cardsOnSale: cards })
        } catch (error) {console.error(error)}
        
     
    }
    
    
>>>>>>> 30bd0ebde349e4ab20a1a3750668357bcbbcb35d
    render() {

        

        if(this.state.pokemon === null) return (<div>Loading...</div>)

            return (
                <div className="OneCard">
                    <OneCardContainer pokemon={this.state.pokemon}/>
                    
                    <div>
                    <ActionButtons 
                    addCard={this.addCard} 
                    putCardOnSale={this.putCardOnSale}
                    showForm={this.displaySaleForm}
                    >
                        {this.state}
                    </ActionButtons>

                    {this.state.cardsOnSale.length > 0 ?
                        <OffersTable onBid={this.handleBid} offers={this.state.cardsOnSale} /> :
                        <div>No vendor is currently selling this card.</div>
                    }

                    {this.state.cardsOpenForExchange.length > 0 ? 
                        <TableCardsOpenForExchange offers={this.state.cardsOpenForExchange} pokemon={this.state.pokemon}/> : 
                        <div>No card is open for exchange for now.</div>
                    }

                     

                  
                    </div>
                </div>
            )
        }

    }


export default OneCard

