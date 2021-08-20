import React, { Component } from 'react'
import PropTypes from 'prop-types'
import apiHandler from '../api/apiHandler'

export class AllCards extends Component {
    state = {
        cards: [],
    }

    async componentDidMount(){
        
        try {
            const pokemonCards = await apiHandler.getItems()
            this.setState({cards: pokemonCards}, () => console.log(this.state.cards))
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
               {this.state.cards.map(element => {
                   return <div>{element.name}</div>
               })}
            </div>
        )
    }
}

export default AllCards
