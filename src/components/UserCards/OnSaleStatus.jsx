import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import FormSale from '../Forms/FormSale'

export class OnSaleStatus extends Component {
    state = {
        status: false, 
        callForm: false
    }

    getCardStatus = async (id) => {
        await apiHandler.getOneUserCard(id)
        .then((res) => {
            this.setState({
                status : res.onSale
            })
        })
        .catch(error => console.error(error))
    }

    callForm = () => {
        this.setState({ callForm : true })
    }

    closeForm = () => {
        this.setState({ callForm : false });
        this.getCardStatus(this.props.card._id)
    }

    cancelAuction = async () => {
        try {
            await apiHandler.deleteAuctionByItem(this.props.card._id);
            await apiHandler.updateCard(this.props.card._id, {onSale: false});
            const updatedStatus = await this.getCardStatus(this.props.card._id);
            console.log(updatedStatus)
            this.setState({ status : updatedStatus.onSale})
        }
        catch (error) {console.log(error)}
    }

    componentDidMount() {
        this.setState({
            status: this.props.card.onSale
        })
    }

    render() {
        return (
            <div>
                {this.state.status ? 
                (<div>
                    <p>Card currently up for auction</p>
                    <button onClick={this.cancelAuction} className="button primary">CANCEL AUCTION</button>
                </div>) : 
                (<button onClick={this.callForm} className="button primary">START AUCTION</button>)}

                {this.state.callForm && 
                <FormSale card={this.props.card} closeForm={this.closeForm}/>}
            </div>
        )
    }
}

export default OnSaleStatus
