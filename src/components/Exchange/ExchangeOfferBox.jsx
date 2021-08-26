import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import Loading from '../Loading';

export class ExchangeOfferBox extends Component {
    state = {
        loading: true,
        items: null
    }

    async componentDidMount() {
        try {
            const promises = this.props.items.map(item => {
                return (
                    apiHandler.getOneCardFromApi(item.pokemonTCGId)
                )
            })

            const responses = await Promise.all(promises)

            const populatedItems = this.props.items.map((item, i) => {
                return (
                    {...item, pokemonTCGId: responses[i]}
                )
            })

            this.setState({
                items: populatedItems, 
                loading: false
            })
        }
        catch (error) { console.error(error)}
    }


    render() {
        if(this.state.loading === true) return <Loading></Loading>
        return (
            <div>
                <ul>
                    {this.state.items.map(item => {
                        return (
                            <li key={item._id + 3}>
                                <div> 
                                    <img src={item.pokemonTCGId.images.small} alt={"photo " + item.pokemonTCGId.name}/>
                                <p>{item.pokemonTCGId.name}</p>
                                <p>Average sell price : {item.pokemonTCGId.cardmarket.prices.averageSellPrice}</p>
                                </div>
                            </li>
                            
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default ExchangeOfferBox
