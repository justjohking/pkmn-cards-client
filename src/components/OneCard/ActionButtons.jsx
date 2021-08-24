import React, { Component } from 'react';

class OneCardActions extends Component {

    render() {
        const { isLoggedIn, userCards } = this.props.children;

        return (
            <div>
                <div>
                    
                    {isLoggedIn && 
                    userCards.length === 0 && 
                    <button onClick={this.props.addCard}>Add to my collection</button> } {/* user indicates that they own this card */}

                    {isLoggedIn && 
                    userCards.length > 0 && 
                    <div>
                        <p>You have {userCards.length} {userCards.length === 1 ? "version" : "versions"} of this card.</p>
                        <button onClick={this.props.addCard}>Add another to my collection</button>
                    </div>}

                    {/* {isLoggedIn &&
                    userCards.length > 0 && 
                    <button onClick={() => this.props.sellCard(userCards._id)}>Sell</button>} user wants to sell this card */}

                    {isLoggedIn && userCards.map(card => {
                        return(
                            <div key={card._id}>
                                <p>Card Id : {card._id} => {card.onSale ? 
                                <span>Card on sale</span> : 
                                <button onClick={() => this.props.putCardOnSale(card._id)}>Sell</button>}
                                
                                </p>
                            </div>
                        )
                    })}

                    {isLoggedIn && 
                    <button>See offers from other vendors</button>}
                    
                    {!isLoggedIn && 
                    <div>See offers</div>} {/* user seeks to make a bid or exchange to get this card */}
                </div>
            </div>
        )
    }
}

export default OneCardActions

