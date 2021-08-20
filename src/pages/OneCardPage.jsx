import React, { Component } from 'react';
import apiHandler from '../api/apiHandler';
import OneCardActions from '../components/OneCard/OneCardActions';
import CardInfo from '../components/OneCard/CardInfo';
import "../components/OneCard/OneCard.css";


export class OneCardPage extends Component {
    state = {
        user: {},
        pokemon : null,
        isLoggedIn: false,
    }

    async componentDidMount() {
        const pokemonInfo = await apiHandler.getOneCardFromApi(this.props.match.params.id)
        this.setState({
            pokemon: pokemonInfo.data
        })

        await apiHandler
      .isLoggedIn()
      .then((data) => {
        this.setState({ user: data, isLoggedIn: true});
      })
      .catch((error) => {
        this.setState({ user: null, isLoggedIn: false});
      });
    }
    render() {
        if(this.state.pokemon === null) return (<div>Loading...</div>)
        else {
            return (
                <div className="OneCard">
                    <div className="div-left">

                        <img src={this.state.pokemon.images.large} alt="card"/>

                            <OneCardActions>{this.state}</OneCardActions>

                    </div>
    
                    <CardInfo
                    pokemon={this.state.pokemon}
                    />
                </div>
            )
        }

    }
}

export default OneCardPage
/* 
For the buttons :
*/