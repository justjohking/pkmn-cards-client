import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import BidItem from '../components/Bids/BidItem'

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
                {/* {this.state.collection[0]} */}
                {/* {console.log(this.state.collection)} */}
                <h1>ALL THE CARDS ON SALE</h1>
                <div>{this.state.cards.map(e => {
                    // console.log(e)
                    return (
                        <BidItem card={e} />
                    )
                })
                
                   
                    
                    
                }
                </div>
                
            </div>
        )
    }
}

export default Bids
