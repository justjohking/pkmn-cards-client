import React, { Component } from 'react';

class OneCardActions extends Component {

    render() {
        const { isLoggedIn, userCards } = this.props.children;
        console.log(isLoggedIn, userCards)
        return (
            <div>
                <div>
                    
                    {isLoggedIn && 
                    userCards.length === 0 && 
                    <button onClick={() => this.props.addCard("Owned")}>Add to my collection</button> } {/* user indicates that they own this card */}

                    {isLoggedIn && 
                    userCards.length > 0 && 
                    <div>
                        <p>You have {userCards.length} versions of this card.</p>
                        <button onClick={() => this.props.addCard("Owned")}>Add another to my collection</button>
                    </div>}
                    
                    {!isLoggedIn && 
                    <button onClick={() => this.props.addCard("Owned")}>Add to my collection</button>}

                    {isLoggedIn &&
                    userCards.length > 0 && 
                    <button onClick={() => this.props.addCard("Sell")}>Sell</button>} {/* user wants to sell this card */}

                    <button>See all the versions of this card being sold</button> {/* user seeks to make a bid or exchange to get this card */}
                </div>
            </div>
        )
    }
}

export default OneCardActions

