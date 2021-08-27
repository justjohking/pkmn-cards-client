import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler'

export class BtnExchangeStatus extends Component {
    state = {
        openForExchange : this.props.card.openForExchange
    }

    handleClick = async () => {
        try {
            await apiHandler.updateCard(this.props.card._id, {
                openForExchange: !this.props.card.openForExchange
            })
            this.props.update();
        }
        catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div>

                {!this.props.card.openForExchange && 
                <div>
                    <p>Not open for exchanges</p>
                    <button onClick={this.handleClick} className='template-button-all-cards'>Accept exchanges</button>
                </div>}

                {this.props.card.openForExchange && 
                <div>
                    <p>Open for exchanges</p>
                    <button onClick={this.handleClick}  className='template-button-all-cards'>Refuse exchange</button>
                </div>}
                
                {/* <input type="checkbox" name="openForExchange" defaultChecked={this.state.openForExchange} onClick={this.handleChange}/> */}
            </div>
        )
    }
}

export default BtnExchangeStatus
