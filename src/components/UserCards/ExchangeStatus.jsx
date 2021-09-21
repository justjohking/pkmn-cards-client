import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler'

export class ExchangeStatus extends Component {
    state = {
        status : false
    }

    changeExchangeStatus = async () => {
        try {
            await apiHandler.updateCard(this.props.card._id, {
                openForExchange: !this.state.status
            });
            const updatedCard = await apiHandler.getOneUserCard(this.props.card._id);
            this.setState({
                status : updatedCard.openForExchange
            })
            
        }
        catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.setState({
            status: this.props.card.openForExchange
        })
    }

    render() {
        return (
            <div>

                {!this.state.status && 
                <div>
                    <p>Not open for exchanges</p>
                    <button onClick={this.changeExchangeStatus} className='button primary'>Accept exchanges</button>
                </div>}

                {this.state.status && 
                <div>
                    <p>Open for exchanges</p>
                    <button onClick={this.changeExchangeStatus}  className='button primary'>Refuse exchange</button>
                </div>}
                
                {/* <input type="checkbox" name="openForExchange" defaultChecked={this.state.openForExchange} onClick={this.handleChange}/> */}
            </div>
        )
    }
}

export default ExchangeStatus
