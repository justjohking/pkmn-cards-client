import React, { Component } from 'react';

export class OneCardActions extends Component {

    handleClick = () => {
        console.log(this.props.children)
    }
    render() {
        return (
            <div>
                <div>
                    <button onClick={this.handleClick}>Add to my collection</button>
                    <button>Sell</button>
                    <button>Buy</button>
                </div>
            </div>
        )
    }
}

export default OneCardActions
