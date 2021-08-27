import React, { Component } from 'react';
import apiHandler from '../../../api/apiHandler';
import { withUser } from '../../Auth/withUser';

export class OneOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBid: 0,
            previousBid: this.props.offer.bid?.currentBid ||0,
            auction: {},
            hasHighestBid: false,
        }
        this.timer = null;
        this.updateAuction = this.updateAuction.bind(this)
    }

    getCurrentAuction = async (id) => {
        await apiHandler.findAuction(id)
        .then((response) => { this.setState({ auction: response }) })
        .catch(error => console.log(error))
    }

    handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        this.setState({
            [key]: value, 
        })
    }

    updateAuction = (id) => { this.props.updateAuction(id) }

    handleSubmit = async (id) => {
        if(this.state.currentBid < this.state.previousBid) {
            console.log("current bid is too low")
        } 

        // update the auction : the "currentBid" is now the "highest bid"
        const updatedBid = {currentBid: this.state.currentBid}
        await apiHandler.updatedBids(id, updatedBid)
        .then((response) => { this.setState({ auction: response }) })
        .catch(error => console.log(error))

        // GET to update the auction's infos
        // this.updateAuction();

        this.displayCurrentBid();
    }


    finalFunction = async (id) => {
        try {
            await this.handleSubmit(id)
            await this.handleBid()
        } catch (error) {console.log(error)}
    }

    displayCurrentBid = () => {
        if(this.props.offer.bid.buyer === this.props.context.user._id) {
            this.setState({ hasHighestBid: true })
        }
    }

    componentDidMount(){
        this.getCurrentAuction(this.props.offer.bid._id)

        if(this.props.context.isLoggedIn) {
            this.displayCurrentBid()
        }
        
    }

    async componentDidUpdate() {
        this.timer = setTimeout(() => {
            this.getCurrentAuction(this.props.offer.bid._id)
        }, 5000)
    }

    async componentWillUnmount() {
        clearTimeout(this.timer)
    }


    render() {
        return (
            <tr key={this.state.auction._id}>

            <td>{this.props.offer.owner.email}</td>

            <td>{this.props.offer.cardState}</td>

            <td>
                {this.props.offer.bid.initialPrice} $</td>

            <td>{this.state.auction.currentBid ? `${this.state.auction.currentBid} $` : "Be the first to Bid"}</td>
            {/* <td>{this.props.offer.bid.endDate}</td> */}
            <td>
                {this.state.hasHighestBid && 
                <div>
                <p>You're in the lead !</p>
                </div>}

                {!this.state.hasHighestBid && 
                    <input 
                    type="number" 
                    name="currentBid" 
                    value={this.state.currentBid}                                          
                    onChange={this.handleChange} 
                />}
                
            </td>
            <td>{!this.state.hasHighestBid &&
                <button onClick={() => this.handleSubmit(this.state.auction._id)} >
                    Place Bid
                    </button>}
                </td>
        </tr>
        )
    }
}

export default withUser(OneOffer);

