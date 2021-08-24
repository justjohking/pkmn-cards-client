import React, { Component } from 'react'
import apiHandler from '../api/apiHandler'
import OneCardItemList from '../components/CardsList/OneCardItemList';
export class Bids extends Component {
    
    state = { 
        collection: [],
    }

    async componentDidMount(){
        const cards =  await apiHandler.findBids("Sell");
        
        const cardPromises = cards.map(card => {
            return apiHandler.getOneCardFromApi(card.pokemonTCGId);
        })


        const responses = await Promise.all(cardPromises);
        console.log("---------------------------")
        console.log("before",cards)
        const populatedCards = cards.map((card,i) => {
          return {
              ...card,
              pokemonTCGId: responses[i].data
          }
        })


        console.log("after,",populatedCards)

        console.log("---------------------------")
        this.setState({
            collection: populatedCards
        })
        
    }

    render() {
        
        console.log(this.state.collection)
        
        // console.log(Array.isArray(this.state.collection))
        // console.log(this.state.collection.length)
        // console.log(this.state.collection)
        this.state.collection.forEach(e => {
            console.log(e)
        })

        return (
            

            <div>
                length ; 
                {/* {this.state.collection[0]} */}
                {/* {console.log(this.state.collection)} */}
                <h1>Bidding Page</h1>
                <div>{this.state.collection.map(e => {
                    console.log(e)
                    return (
                        <OneCardItemList card={e.pokemonTCGId} />
                    )
                })
                
                   
                    
                    
                }
                </div>
                
            </div>
        )
    }
}

export default Bids
