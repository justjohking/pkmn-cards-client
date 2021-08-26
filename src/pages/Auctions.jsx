import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import AuctionItem from '../components/Auctions/AuctionItem'
import "./Auctions.css"

export class Bids extends Component {
    
    state = { 
        cards: [],
    }

    async componentDidMount(){
        const cards =  await apiHandler.findCardsOnSale();
        
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
            cards: populatedCards
        })
    }

    render() {
        return (
        
            <div>
                <h1>Cards on Sale : </h1>
                <div className="auctions-div">{this.state.cards.map(e => {
                    return (
                        <AuctionItem card={e} />
                    )
                })
                }
                </div>
            </div>
        )
    }
}

export default Bids
