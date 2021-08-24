import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import BidItem from '../components/Bids/BidItem'

export class Bids extends Component {
    
    state = { 
        collection: [],
    }

    async componentDidMount(){
        const cards =  await apiHandler.findBids();
        
        const cardPromises = cards.map(card => {
            return apiHandler.getOneCardFromApi(card.pokemonTCGId);
        })

        const responses = await Promise.all(cardPromises);
        // console.log("---------------------------")
        // console.log("before",cards)
        const populatedCards = cards.map((card,i) => {
          return {
              ...card,
              pokemonTCGId: responses[i].data
          }
        })
        // console.log("after,",populatedCards)
        // console.log("---------------------------")
        this.setState({
            collection: populatedCards
        })
        
    }

    render() {
        
        // this.state.collection.forEach(e => {
        //     console.log(e)
        // })

        return (
        
            <div>
                {/* {this.state.collection[0]} */}
                {/* {console.log(this.state.collection)} */}
                <h1>ALL THE CARDS ON SALE</h1>
                <div>{this.state.collection.map(e => {
                    // console.log(e)
                    return (
                        <BidItem card={e.pokemonTCGId} />
                    )
                })
                
                   
                    
                    
                }
                </div>
                
            </div>
        )
    }
}

export default Bids
