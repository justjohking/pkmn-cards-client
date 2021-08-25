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
        // this.setState({
        //     openForExchange: !event.target.checked
        // })
        // console.log(this.state.openForExchange)
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


    handleClick = async () => {
        try {
            await apiHandler.updateCard(this.props.card._id, {
                openForExchange: !this.props.card.openForExchange
            })
            console.log(this.props.card)
        }
        catch (error) {
            console.error(error);
        }
    }

    render() {
        // console.log(this.state.openForExchange)
        return (
            <div>

                {!this.props.card.openForExchange && 
                <div>
                    <p>Not open for exchanges</p>
                    <button onClick={this.handleClick}>Accept exchanges</button>
                </div>}

                {this.props.card.openForExchange && 
                <div>
                    <p>Open for exchanges</p>
                    <button onClick={this.handleClick}>Refuse exchange</button>
                </div>}
                
                {/* <input type="checkbox" name="openForExchange" defaultChecked={this.state.openForExchange} onClick={this.handleChange}/> */}
            </div>
        )
    }
}

export default BtnExchangeStatus
