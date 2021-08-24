import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler'
import "./OffersTable.css"

export class OffersTable extends Component {

    state = {
        currentBid: 0,
        bidId: "",
    }


    handleChange = (event) => {
        
        

        const key = event.target.name
        const value = event.target.value



        this.setState({
            [key]: value,
            
        })
     
    }

    handleSubmit = (id) => {
        
        
        
        const updatedBid = {currentBid: this.state.currentBid}
       
        apiHandler.updatedBids(id, updatedBid)
    }
    

    render() {
        
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Seller</td>
                            <td>Card State</td>
                            <td>Initial Price</td>
                            <td>Current Bid</td>
                            <td>End date</td>
                            <td>Your offer</td>
                            <td>Confirm</td>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {this.props.offers.map(e => {
                            console.log(e)
                            console.log(e.bid)

                            return (
                                <tr>
                                    <td>{e.owner.email}</td>
                                    <td>{e.cardState}</td>
                                    <td>{e.bid.initialPrice} $</td>
                                    <td>{e.bid.currentBid ? `${e.bid.currentBid} $` : "Be the first to Bid"}</td>
                                    <td>{e.bid.endDate}</td>
                                    <td>
                                        <input 
                                            type="number" 
                                            name="currentBid" 
                                            value={this.state.currentBid}                                          
                                            onChange={this.handleChange} 
                                            min={e.bid.currentBid}
                                        />
                                       
                                    </td>
                                    <td><button onClick={
                                        () => { this.handleSubmit(e.bid._id) 
                                    }}>Place Bid</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OffersTable
