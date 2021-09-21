import React, { Component } from 'react';
import { withUser } from '../Auth/withUser';

class OneCardActions extends Component {

    handleAdd = () => {
        this.props.getUserCardsFromModel();
    }

    render() {
        const { userCards } = this.props.children;

        return (
            <div>
                <div>
                    
                    {this.props.context.isLoggedIn && 
                    userCards.length === 0 && 
                    <button onClick={this.props.addCard} className="button primary">Add to my collection</button> } {/* user indicates that they own this card */}

                    {this.props.context.isLoggedIn && 
                    userCards.length > 0 && 
                    <div>
                        <p>You have {userCards.length} {userCards.length === 1 ? "version" : "versions"} of this card.</p>
                        <button onClick={this.props.addCard} className="button primary">Add another to my collection</button>
                    </div>}

                    {this.props.context.isLoggedIn && 
                    userCards.map(card => {
                        return(
                            <div key={card._id}>
                                
                            </div>
                        )
                    })}

                    {this.props.context.isLoggedIn && 
                    <h2>All the current offers : </h2>}
                    
                    {this.props.context.isLoggedIn && 
                    <div>See offers</div>} {/* user seeks to make a bid or exchange to get this card */}
                </div>
            </div>
        )
    }
}

export default withUser(OneCardActions);

