import React, { Component } from 'react';
import apiHandler from '../api/apiHandler';
import AuctionItem from '../components/Auctions/UserAuctions/AuctionItem';
import "./Auctions.css";
import Message from '../components/Message';
import Explanation from '../components/Explanation';

export class Auctions extends Component {
    
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
                <h1>Ongoing auctions</h1>

                <Explanation>
                    <p>Here are all the ongoing auctions. You can place a bid in order to acquire those cards.</p>
                    <p>Each item in this list represent a model of Pokemon card. To see all the auctions for this model, click on "Auction Details".</p>
                </Explanation>

                {this.state.cards.length === 0 &&
                <Message>
                    <p>There are no ongoing auctions.</p>
                </Message>}
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

export default Auctions
