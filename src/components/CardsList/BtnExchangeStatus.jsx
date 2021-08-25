import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler'

export class BtnExchangeStatus extends Component {
    state = {
        openForExchange : this.props.card.openForExchange
    }

    handleChange = async (event) => {
        // const isChecked = () => {
        //     return event.target.checked ? true : false
        // }
        // console.log("is checked", isChecked())
        this.setState({
            openForExchange: !event.target.checked
        })
        console.log(this.state.openForExchange)
        // try {
    
        //     await apiHandler.updateCard(this.props.card._id, {
        //         openForExchange: this.state.openForExchange
        //     })

        //     console.log(this.props.card)
        // }
        // catch (error) {
        //     console.error(error);
        // }
    }

    render() {
        // console.log(this.state.openForExchange)
        return (
            <div>
                <label htmlFor="openForExchange">Open for exchange</label>
                <input type="checkbox" name="openForExchange" defaultChecked={this.state.openForExchange} onClick={this.handleChange}/>
            </div>
        )
    }
}

export default BtnExchangeStatus
