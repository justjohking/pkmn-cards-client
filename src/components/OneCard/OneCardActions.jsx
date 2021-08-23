import React, { Component } from 'react';

class OneCardActions extends Component {

    render() {
        const { isLoggedIn, userCards } = this.props.children;

        return (
            <div>
                <div>
                    
                    {isLoggedIn && 
                    userCards.length === 0 && 
                    <button onClick={() => this.props.addCard("Owned")}>Add to my collection</button> } {/* user indicates that they own this card */}

                    {isLoggedIn && 
                    userCards.length > 0 && 
                    <div>
                        <p>You have {userCards.length} {userCards.length === 1 ? "version" : "versions"} of this card.</p>
                        <button onClick={() => this.props.addCard("Owned")}>Add another to my collection</button>
                    </div>}
                    
                    {!isLoggedIn && 
                    <button onClick={() => this.props.addCard("Owned")}>Add to my collection</button>}

                    {isLoggedIn &&
                    userCards.length > 0 && 
                    <button onClick={() => this.props.sellCard(userCards._id)}>Sell</button>} {/* user wants to sell this card */}

                    {userCards.map(card => {
                        return(
                            <div key={card._id}>
                                <p>Card Id : {card._id} <button onClick={() => this.props.putCardOnSale(card._id)}>Sell</button> </p>
                            </div>
                        )
                    })}

                    <button>See offers from other vendors</button> {/* user seeks to make a bid or exchange to get this card */}
                </div>
            </div>
        )
    }
}

export default OneCardActions

