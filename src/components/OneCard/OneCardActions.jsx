import React, { Component } from 'react';

export class OneCardActions extends Component {

    render() {
        // console.log(this.props.children)
        return (
            <div>
                <div>
                    <button onClick={this.props.addCardToOwned}>Add to my collection</button>
                    <button>Sell</button>
                    <button>Buy</button>
                </div>
            </div>
        )
    }
}

export default OneCardActions
