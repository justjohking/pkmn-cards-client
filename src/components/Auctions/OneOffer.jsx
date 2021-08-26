import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';

export class OneOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBid: 0,
            previousBid: this.props.offer.bid?.currentBid ||0,
            auction: {},
            bidPlaced: false,
            hasHighestBid: false,
            userId: "",
        }
        this.timer = null;
    }

    async componentDidMount(){
        await apiHandler.isLoggedIn().then((response => {
            this.setState({
                userId: response._id
            })
        }))

        const currentAuction = await apiHandler.findAuction(this.props.offer.bid._id)
        this.setState({
            auction: currentAuction
        })
        this.displayCurrentBid()
    }

    getCurrentAuction = async (_id) => {
        await apiHandler.findAuction(_id)
            .then((response) => {
                this.setState({
                    auction: response
                })
            })
            .catch(error => console.log(error))
    }

    async componentDidUpdate() {
        this.timer = setTimeout(() => {
            this.getCurrentAuction(this.props.offer.bid._id)
        }, 5000)
    }

    async componentWillUnmount() {
        clearTimeout(this.timer)
    }

    handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        this.setState({
            [key]: value, 
        })
    }

    handleSubmit = (id) => {
        if(this.state.currentBid < this.state.previousBid) {
            console.log("current bid is too low")
        } else {
            const updatedBid = {currentBid: this.state.currentBid}
            apiHandler.updatedBids(id, updatedBid)
            this.setState({
                auction: updatedBid
            })
            this.props.onBid();
            this.setState({
                bidPlaced : true
            })
            this.displayCurrentBid();
        }
    }

    finalFunction = async (id) => {
        try {
            await this.handleSubmit(id)
            await this.props.onBid()
        } catch (error) {console.log(error)}
    }

    displayCurrentBid = () => {
        if(this.props.offer.bid.buyer === this.state.userId) {
            this.setState({
                hasHighestBid: true
            })
        }
    }

    render() {
        console.log(this.props)
        return (
            <tr key={this.state.auction._id}>

            <td>{this.props.offer.owner.email}</td>

            <td>{this.props.offer.cardState}</td>

            <td>{this.props.offer.bid.initialPrice} $</td>

            <td>{this.state.auction.currentBid ? `${this.state.auction.currentBid} $` : "Be the first to Bid"}</td>
            <td>{this.props.offer.bid.endDate}</td>
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
                <button  onClick={() => this.handleSubmit(this.state.auction._id)} >
                    Place Bid
                    </button>}
                </td>
        </tr>
        )
    }
}

export default OneOffer;

